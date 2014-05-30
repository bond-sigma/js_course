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
            multi   : true,
            canBeSkipped: false

        },
        {
            question: 'Where do you live?',
            answers : [
               "Home", 'Work', "Train station"
            ],
            chosen  : [],
            multi   : false,
            canBeSkipped: false


        }
    ],
    init: function () {
        console.log('Quiz inited');

        var self = this;

        this.startButton =  document.getElementById('start-button');
        this.startButton.addEventListener('click', function () {
            self.startQuiz();
        }, false);

        document.getElementById('next-btn').addEventListener('click', function () {
            self.goTo(1);
        }, false);

        document.getElementById('back-btn').addEventListener('click', function () {
            self.goTo(-1);
        }, false);

        this.mainContainer      = document.getElementById('quiz-container');
        this.answersContainer   = document.getElementById('answers-container');
        this.titleContainer     = document.getElementById('question-title');

    },
    startQuiz: function () {
        this.startButton.style.display = 'none';
        this.showQuestion();
        this.renderQuestion();

        this.mainContainer.style.display = 'block';

        //console.log('Quiz started');
    },
    renderQuestion: function () {
        var $ul = this.createAnswersList();
        this.answersContainer.appendChild($ul);
    },
    showQuestion: function () {
        this.titleContainer.innerHTML = this.questions[this.currentIndex].question;
    },
    removeQuestion: function () {
        this.answersContainer.innerHTML = '';
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

            if (!question.multi && controlName == 'radio') {
                $control.name = 'answer';
            }

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
    },

    goTo: function ( direction ) {
        var question    = this.questions[this.currentIndex],
            chosen      = [];

        var $inputs = this.answersContainer.getElementsByTagName('input');

        for (var i = 0; i < $inputs.length; i++) {
            if ($inputs[i].checked) {
                chosen.push(i);
            }
        }

        if (chosen.length == 0 && !question.canBeSkipped) {
            alert('Question can\'t be skipped!');
            return false;
        }

        question.chosen = chosen;

        if (direction == -1 && this.currentIndex == 0 ) {
            return false;
        } else if (direction == 1 && this.currentIndex == this.questions.length - 1) {
            return false;
        }

        this.currentIndex += direction;

        this.removeQuestion();

        this.renderQuestion();

        return true;
    }
};