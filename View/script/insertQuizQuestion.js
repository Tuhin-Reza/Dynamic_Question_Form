var questionCount = 1;

function addMore() {
    $("#show_question").append(`
        <div class="row questionArea">
           <label class="btn btn-primary questionNumber">
                  Question No <span class="badge badge-light questionnumberCount" style="font-weight: bold; color: black;">${questionCount}</span>
            </label>
           <div class="col-md-12">
                <button type="button" class="btn btn-default btn-sm btn-danger remove_item_btn" onclick="removeQuestion(this)">
                      <span class="glyphicon glyphicon-trash"></span> Remove
                 </button>
            </div>

            <div class="col-md-12 questionInput">
                <textarea name="question[]" class="form-control" placeholder="Write Question Here" required ></textarea>
            </div>
            <div class="col-md-6 optionInput">
                <input type="text" name="optionA[]" class="form-control" placeholder=" Enter Option A" required>
            </div>
            <div class="col-md-6 optionInput">
                <input type="text" name="optionB[]" class="form-control" placeholder=" Enter Option B" required>
            </div>
            <div class="col-md-6 optionInput">
                <input type="text" name="optionC[]" class="form-control" placeholder=" Enter Option C" required>
            </div>
            <div class="col-md-6 optionInput">
                <input type="text" name="optionD[]" class="form-control" placeholder=" Enter Option D" required>
            </div>
            <div class="col-md-6">
                <select name="correctOption[]" class="form-control" required>
                    <option value="">Correct Option</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>
        </div>
    `);
    questionCount++;
    updateQuestionNumbers();
}

$(document).ready(function () {
    addMore();
});

function removeQuestion(button) {
    $(button).closest(".row").remove();
    updateQuestionNumbers();
    questionCount--;
    updateQuestionCounts();
}

function updateQuestionCounts() {
    var index = 1;
    $(".questionArea").each(function () {
        $(this).find('.btn.btn-primary .badge.badge-light').text(index);
        index++;
    });
}

function updateQuestionNumbers() {
    var index = 1;
    $("#show_question .row h2").each(function () {
        $(this).text("Question " + index);
        index++;
    });
}

function submitQuiz(event) {
    event.preventDefault();
    var formElements = document.getElementById("quizForm").elements;
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
    }
    document.getElementById("loadder").style.display = "block";
    setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loadder").style.display = "none";
    var formElements = document.getElementById("quizForm").elements;
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].disabled = false;
    }
}


$(document).on('click', '#submitQuiz', function () {
    var isFormValid = validateForm(); 
    if (isFormValid) {
        submitQuiz(event); 

        setTimeout(function () {
            var formData = $('#quizForm').serialize();
            $.ajax({
                type: 'POST',
                url: '/Controller/insertQuizQuestionContoller.php',
                data: formData,
                success: function (response) {
                    alert('Quiz question submitted successfully!');
                    resetFormAndCloseModal();
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    alert('Error occurred while submitting the form. Please try again.');
                }
            });
        }, 3000);
    }
});

function validateForm() {
    var isValid = true;
    // $('#quizForm [required]').each(function () {
    //     if (!$(this).val()) {
    //         isValid = false;
    //         return false;
    //     }
    // });

    $('.questionArea').each(function () {
        var questionInput = $(this).find('textarea[name="question[]"]').val().trim();
        var optionA = $(this).find('input[name="optionA[]"]').val().trim();
        var optionB = $(this).find('input[name="optionB[]"]').val().trim();
        var optionC = $(this).find('input[name="optionC[]"]').val().trim();
        var optionD = $(this).find('input[name="optionD[]"]').val().trim();
        var correctOption = $(this).find('select[name="correctOption[]"]').val().trim();
        if (questionInput === '' || optionA === '' || optionB === '' || optionC === '' || optionD === '' || correctOption === '') {
            isValid = false;
            return false; 
        }
    });

    if (!isValid) {
        alert('Please fill in all fields for each question.');
    }

    return isValid;
}

function resetFormAndCloseModal() {
    $("#show_question .row").remove();
    document.getElementById("quizForm").reset();
    $('#questionModal').modal('hide');
}


