const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answersElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()

})
function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answersElement.appendChild(button)
    })
    

}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answersElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true},
            { text: '22', correct: false}
        ]
    },
    {
        question: 'what day comes after monday?',
        answers: [

            { text: 'sunday', correct: false},
            { text: 'saturday', correct: false},
            { text: 'tuesday' , correct: true},
            { text: 'friday' , correct: false}
        ]
    },
    {
        question: 'whats the name of the developer of this Quiz?',
        answers: [

            { text: 'Todd', correct: false},
            { text: 'John', correct: false},
            { text: 'Mike' , correct: false},
            { text: 'Faizy' , correct: true}
        ]
    },
    {
        question: 'Which one of these dog breeds is found in Pakistan',
        answers: [

            { text: 'Husky', correct: false},
            { text: 'Rottweiler', correct: false},
            { text: 'A and GH' , correct: true},
            { text: 'Golden Retriever' , correct: false}
        ]
    }

 
]
