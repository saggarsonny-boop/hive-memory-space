export default function GrapplerHook() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-600 font-mono">
      <div className="text-zinc-500 font-semibold mb-2">GrapplerHook v1.0.0</div>
      <div>engine: HiveMemorySpace</div>
      <div>schema: memory-intelligence</div>
      <div>safety: standard</div>
      <div>owner_check: memory.user_id === session.user.id</div>
      <div>blob_privacy: proxied via /api/files/[id]</div>
    </div>
  )
}



<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>
