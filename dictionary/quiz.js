var Quiz = {
    startButton     : null,
    mainContainer   : null,
    titleContainer  : null,
    canGoBack       : true,
    currentIndex    : 0,
    questions: [
        {
            question: 'What is your name',
            answers : [
               "Ivan", 'Dima', "Sergei"
            ],
            chosen  : [0, 2],
            multi   : true

        },
        {
            question: 'Where do you live?',
            answers : [
               "Home", 'Work', "Train station"
            ],
            chosen  : [],
            multi   : false

        }
    ],
    init: function () {
        console.log('Quiz inited');

        var self = this;

        this.startButton =  document.getElementById('start-button');
        this.startButton.addEventListener('click', function () {
            self.startQuiz();
        }, false);

        this.mainContainer      = document.getElementById('quiz-container');
        this.answersContainer   = document.getElementById('answers-container');
        this.titleContainer     = document.getElementById('question-title');


    },
    startQuiz: function () {
        this.startButton.style.display = 'none';
        this.showQuestion();

        var $ul = this.createAnswersList();
        this.answersContainer.appendChild($ul);

        this.mainContainer.style.display = 'block';

        //console.log('Quiz started');
    },
    showQuestion: function () {
        this.titleContainer.innerHTML = this.questions[this.currentIndex].question;
    },
    createAnswersList: function () {
        var $ul = document.createElement('UL'),
            $li,
            controlName = (this.questions[this.currentIndex].multi) ? 'checkbox' : 'radio',
            $control,
            $label,
            $text,
            question = this.questions[this.currentIndex];

        for (var i = 0; i < question.answers.length; i ++ ) {

            $li             = document.createElement('li');
            $control        = document.createElement('input');
            $control.type   = controlName;


            if ( question.chosen.indexOf(i) != -1 ) {
                $control.checked = "checked";
            }

            $label = document.createElement('label');
            $text  = document.createTextNode(question.answers[i]);

            $label.appendChild($control);
            $label.appendChild($text);

            $li.appendChild($label);

            $ul.appendChild($li);
        }

        return $ul;
    }
};