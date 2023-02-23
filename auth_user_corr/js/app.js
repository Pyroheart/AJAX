document.addEventListener('DOMContentLoaded', () => {
  const $form = document.querySelector('#user')
  // Ecoute du form
  $form.addEventListener('submit', (e) => {
    // Block F5
    e.preventDefault()
    // Prepare to post
    const formToPost = new FormData(e.currentTarget)
    // Envoi des datas via `fetch` au controller php `user_controller.php`
    fetch('server/user_ajax.php', {
      method: 'POST',
      body: formToPost
    })
      .then(promise => promise.json())
      .then(res => {
        // Cible du résultat `.result-notif`
        const $notif = document.querySelector('.result-notif')
        // empty previous display
        $notif.innerHTML = ''
        $notif.classList.toggle('alert')
        $notif.classList.remove('alert-success', 'alert-success')
        // Puis reception de la Response du controller pour l'affichage de la notification
        if (res.user !== null) {
          // Display Ok + logout
          $notif.classList.add('alert-success')
          $notif.textContent = res.result
          setTimeout(() => {
            $notif.classList.remove('alert-success')
            $notif.innerHTML = `<div class='alert alert-success'> ${res.user} : a bien été inséré en bdd </div>`
          }, 2000);
        } else {
          // Display Error
          $notif.classList.add('alert-danger')
          $notif.textContent = res.result
          setTimeout(() => {
            $notif.classList.remove('alert-danger')
            $notif.innerHTML = ''
          }, 2000);
        }
        // reset() Form
        e.currentTarget.reset() // simuler reset form
      })
      .catch(err => console.error('Error : ' + err))
  })
})