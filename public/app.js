document.querySelectorAll('.price big').forEach(node => {
  console.log(node);
    node.textContent = new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency'
    }).format(node.textContent)
  })

  console.log('fff353463');