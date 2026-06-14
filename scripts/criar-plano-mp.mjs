const response = await fetch('https://api.mercadopago.com/preapproval_plan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer APP_USR-8040078376035866-060509-577567aa81eb0afcb3471415129b8c88-2557527037'
  },
  body: JSON.stringify({
    reason: "MeuPasso Pro",
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: 12.00,
      currency_id: "BRL"
    },
    payment_methods_allowed: {
      payment_types: [{ id: "credit_card" }]
    },
    back_url: "https://www.meupasso.com.br/assinatura/sucesso"
  })
})

const data = await response.json()
console.log(JSON.stringify(data, null, 2))
