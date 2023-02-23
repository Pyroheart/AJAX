// Quiz token : v1dAzVlnA8Tq7HxnxtqRweLbJjyLOdWGKEgRJqfC
// https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=code&difficulty=Easy&limit=10&tags=Linux,BASH,HTML,JavaScript,MySQL,Laravel
// https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=code&difficulty=Easy&limit=10&tags=PHP,JavaScript,MySQL,HTML
// const tags = ['Linux', 'BASH', 'HTML', 'JavaScript', 'MySQL', 'Laravel', 'PHP']

// Request quizz switch tags
document.querySelector('#choice').addEventListener('change', (e) => {
  // Get value from selected choice
  const urlTag = e.currentTarget.value;
  // Fetch request with `tag` argument
  fetch(`https://quizapi.io/api/v1/questions?apiKey=v1dAzVlnA8Tq7HxnxtqRweLbJjyLOdWGKEgRJqfC&category=code&difficulty=Easy&limit=5&tags=${urlTag}`)
    .then(pro => pro.json())
    .then(res => {
      // Build form
      let idQuestion = 1
      // Langage Choiced
      document.querySelector('#lang').textContent = urlTag
      // Target Question form tag
      const $form = document.querySelector('#questions>form')
      $form.innerHTML = ''

      // Build list
      const $ulHead = document.createElement('ul')
      $form.appendChild($ulHead)
      const $liQuestion = document.createElement('li')
      $ulHead.appendChild($liQuestion)

      // Define Correct Answers
      const responses = []
      // Build checkbox
      res.map(question => {
        console.log(question)
        const $section = document.createElement('section')
        $liQuestion.appendChild($section)
        const $h3 = document.createElement('h5')
        $section.appendChild($h3)
        $h3.innerHTML = `Question ${idQuestion} : <span>${question.id} : ${question.question}</span>`
        idQuestion++
        // Build answers display
        const $ulResponse = document.createElement('ul')
        $section.appendChild($ulResponse)
        // Build checkbox
        for (const answer in question.answers) {
          if (question.answers[answer] !== null) {
            const $liResponse = document.createElement('li')
            $ulResponse.appendChild($liResponse)
            $liResponse.innerHTML =
              `<div class="form-check">
                <input class="form-check-input" type="checkbox" data-question="${question.id}" value="${answer}" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  ${question.answers[answer]}
                </label>
              </div>`
          }
        }
        // Get Correct Answers `use filter is shortest`
        for (const correct in question.correct_answers) {
          if (question.correct_answers[correct] === 'true') {
            responses.push([question.id, correct])
          }
        }
      })

      // Add Submit Button
      $submitBtn = document.createElement('button')
      $submitBtn.classList.add('btn', 'btn-primary')
      $submitBtn.textContent = "Soumettre le QCM"
      $form.appendChild($submitBtn)

      // Listener Form submit
      $form.addEventListener('submit', (e) => {
        // Block auto-refresh
        e.preventDefault()
        // Get user's answers
        const inputs = e.currentTarget.querySelectorAll('input:checked')
        const usersAnswers = []
        inputs.forEach(input => {
          // On concat pour ressembler au tableau des réponses construit plus haut
          usersAnswers.push([parseInt(input.dataset.question), input.value + '_correct'])
        })

        // Compare 2 arrays
        // Method 1
        // const diff = responses.concat(usersAnswers).filter(function (e, i, array) {
        //   // Check if the element is appearing only once
        //   return array.indexOf(e) === array.lastIndexOf(e);
        // });
        // Method 2
        const result = responses.toString() === usersAnswers.toString()
        // Display result
        const $result = document.getElementById('result')
        $result.classList.add('alert')
        $result.classList.remove('alert-success', 'alert-danger')
        if (result) {
          $result.classList.add('alert-success')
          $result.textContent = 'Félicitation, Vous avez fait un sans faute !!'
        } else {
          $result.classList.add('alert-danger')
          $result.textContent = 'Dommage, Tu vas finir clochard !! Sous les ponts !!!'
        }

        // Reload to retry
        setTimeout(() => {
          location.reload()
        }, 3000)
      })
    })
    .catch(err => console.error(`Error : ${err}`))
})