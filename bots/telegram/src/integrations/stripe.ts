/**
 * Stripe Integration
 *
 * Payment links and subscription management.
 */

const STRIPE_API_URL = 'https://api.stripe.com/v1';

export class StripeClient {
  private secretKey: string | null;

  constructor() {
    this.secretKey = process.env.STRIPE_SECRET_KEY || null;
  }

  private getHeaders(): HeadersInit {
    if (!this.secretKey) {
      throw new Error('Stripe not configured. Add STRIPE_SECRET_KEY to environment.');
    }

    return {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  async createPaymentLink(params: {
    amount: number; // in cents
    currency: string;
    recurring: 'month' | 'year' | 'one_time';
    customerEmail: string;
    productName?: string;
  }): Promise<{ url: string; id: string }> {
    // First, create or get a price
    const priceId = await this.createPrice(params);

    // Create payment link
    const response = await fetch(`${STRIPE_API_URL}/payment_links`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: new URLSearchParams({
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        'after_completion[type]': 'redirect',
        'after_completion[redirect][url]': process.env.STRIPE_SUCCESS_URL || 'https://gtm-skills.com/thanks',
        'customer_creation': 'always',
        'metadata[customer_email]': params.customerEmail,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stripe API error: ${error}`);
    }

    const data = await response.json();
    return {
      url: data.url,
      id: data.id,
    };
  }

  private async createPrice(params: {
    amount: number;
    currency: string;
    recurring: 'month' | 'year' | 'one_time';
    productName?: string;
  }): Promise<string> {
    // Create a product first
    const productResponse = await fetch(`${STRIPE_API_URL}/products`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: new URLSearchParams({
        name: params.productName || 'GTM Skills Subscription',
        type: 'service',
      }),
    });

    if (!productResponse.ok) {
      throw new Error('Failed to create product');
    }

    const product = await productResponse.json();

    // Create price for the product
    const priceParams: Record<string, string> = {
      product: product.id,
      unit_amount: params.amount.toString(),
      currency: params.currency,
    };

    if (params.recurring !== 'one_time') {
      priceParams['recurring[interval]'] = params.recurring;
    }

    const priceResponse = await fetch(`${STRIPE_API_URL}/prices`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: new URLSearchParams(priceParams),
    });

    if (!priceResponse.ok) {
      throw new Error('Failed to create price');
    }

    const price = await priceResponse.json();
    return price.id;
  }

  async getPaymentLinkViews(linkId: string): Promise<number> {
    // Get sessions for this payment link
    const response = await fetch(
      `${STRIPE_API_URL}/checkout/sessions?payment_link=${linkId}`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.data?.length || 0;
  }

  async getRecentPayments(limit: number = 10): Promise<
    Array<{
      id: string;
      amount: number;
      currency: string;
      customer_email: string;
      status: string;
      created: number;
    }>
  > {
    const response = await fetch(
      `${STRIPE_API_URL}/payment_intents?limit=${limit}`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }

    const data = await response.json();
    return (data.data || []).map((p: {
      id: string;
      amount: number;
      currency: string;
      receipt_email?: string;
      status: string;
      created: number;
    }) => ({
      id: p.id,
      amount: p.amount / 100, // Convert from cents
      currency: p.currency,
      customer_email: p.receipt_email || 'Unknown',
      status: p.status,
      created: p.created,
    }));
  }

  async getSubscriptionMetrics(): Promise<{
    mrr: number;
    activeSubscriptions: number;
    churnedThisMonth: number;
  }> {
    const response = await fetch(
      `${STRIPE_API_URL}/subscriptions?status=active&limit=100`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch subscriptions');
    }

    const data = await response.json();
    const subscriptions = data.data || [];

    const mrr = subscriptions.reduce((total: number, sub: {
      items: { data: Array<{ price: { unit_amount: number; recurring: { interval: string } } }> };
    }) => {
      const item = sub.items.data[0];
      if (!item) return total;

      const amount = item.price.unit_amount / 100;
      const interval = item.price.recurring?.interval;

      // Normalize to monthly
      if (interval === 'year') {
        return total + amount / 12;
      }
      return total + amount;
    }, 0);

    return {
      mrr: Math.round(mrr),
      activeSubscriptions: subscriptions.length,
      churnedThisMonth: 0, // Would need to query canceled subscriptions
    };
  }
}
