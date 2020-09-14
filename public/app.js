document.querySelectorAll('.price').forEach(node => {
  console.log(node);
  node.style.color = 'red'
    node.textContent = new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency'
    }).format(node.textContent)
  })

  console.log('fff353463');

  const $cart = document.querySelector('.cart') || document.body
  $cart.addEventListener('click',(event)=>{
    if(event.target.classList.contains('js-btn')){
      const id = event.target.dataset.id
      fetch(`/cart/remove/${id}`,{
        method:'delete'
      }).then(res=>res.json())
      .then(cart=>{
        console.log(cart);
      })
    }
  })

  
  var instance = M.Tabs.init(document.querySelectorAll('.tabs'));