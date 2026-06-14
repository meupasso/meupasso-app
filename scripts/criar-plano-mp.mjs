const response = await fetch('https://api.mercadopago.com/preapproval_plan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ***REMOVED-MP-TOKEN***'
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
