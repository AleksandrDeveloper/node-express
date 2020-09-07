document.querySelectorAll('.price').forEach(node => {
  console.log(node);
  node.style.color = 'red'
    node.textContent = new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency'
    }).format(node.textContent)
  })

  console.log('fff353463');