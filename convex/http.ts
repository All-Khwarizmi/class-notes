import { httpRouter } from 'convex/server';

import { internal } from './_generated/api';
import { httpAction } from './_generated/server';

const http = httpRouter();
http.route({
  path: '/clerk',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          'svix-id': headerPayload.get('svix-id')!,
          'svix-timestamp': headerPayload.get('svix-timestamp')!,
          'svix-signature': headerPayload.get('svix-signature')!,
        },
      });

      switch (result.type) {
        case 'user.created':
          if (!result.data.username) {
            await ctx.runMutation(internal.users.createUser, {
              userId: result.data.id,
              name: `${result.data.first_name ?? ''} ${
                result.data.last_name ?? ''
              }`,
              hostname: btoa(result.data.id),
              image: result.data.image_url,
              email: result.data.email_addresses[0].email_address,
            });
            await ctx.runMutation(internal.visibility.createVisibilityTable, {
              userId: result.data.id,
            });
            break;
          }
          const hostname = await ctx.runQuery(
            internal.hostname.isHostnameAvailable,
            {
              hostname: result.data.username,
            }
          );
          if (hostname === true) {
            await ctx.runMutation(internal.users.createUser, {
              userId: result.data.id,
              name: `${result.data.first_name ?? ''} ${
                result.data.last_name ?? ''
              }`,
              hostname: btoa(result.data.id),
              image: result.data.image_url,
              email: result.data.email_addresses[0].email_address,
            });
            await ctx.runMutation(internal.visibility.createVisibilityTable, {
              userId: result.data.id,
            });
            break;
          }
          await ctx.runMutation(internal.users.createUser, {
            userId: result.data.id,
            name: `${result.data.first_name ?? ''} ${
              result.data.last_name ?? ''
            }`,
            hostname: result.data.username,
            image: result.data.image_url,
            email: result.data.email_addresses[0].email_address,
          });
          await ctx.runMutation(internal.visibility.createVisibilityTable, {
            userId: result.data.id,
          });
          break;
        case 'user.updated':
          await ctx.runMutation(internal.users.updateUser, {
            userId: result.data.id,
            name: `${result.data.first_name ?? ''} ${
              result.data.last_name ?? ''
            }`,
            image: result.data.image_url,
          });
          break;
      }

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      return new Response('Webhook Error', {
        status: 400,
      });
    }
  }),
});

http.route({
  path: '/stripe',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const signature = request.headers.get('stripe-signature') as string;

    try {
      const result = await ctx.runAction(internal.stripe.fulfill, {
        payload: await request.text(),
        signature,
      });

      if (result.success) {
        return new Response(null, {
          status: 200,
        });
      } else {
        return new Response('Webhook Error', {
          status: 400,
        });
      }

      // switch (result.type) {
      //   case "payment.created":
      //     await ctx.runMutation(internal.payments.createPayment, {
      //       userId: result.data.id,
      //       amount: result.data.amount,
      //       currency: result.data.currency,
      //       paymentMethod: result.data.payment_method,
      //       paymentIntent: result.data.payment_intent,
      //     });
      //     break;
      // }

      //   return new Response(null, {
      //     status: 200,
      //   });
    } catch (err) {
      return new Response('Webhook Error', {
        status: 400,
      });
    }
  }),
});

export default http;
