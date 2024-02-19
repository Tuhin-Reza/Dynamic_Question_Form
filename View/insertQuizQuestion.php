<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insert Quiz Question</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="./style/insertQuizQuestion.css">
</head>

<body>
    <div id="loadder-area">
        <div id="loadder"></div>
    </div>

    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#questionModal">
        Add Quiz Question
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="questionModal" tabindex="-1" role="dialog" aria-labelledby="questionModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="questionModalLabel">Insert Quiz Question</h4>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <form id="quizForm" onsubmit="submitQuiz(event)">
                            <div class="questionBox">
                                <div id="show_question"></div>
                                <div class="submitBox">
                                    <button type="button" class="btn btn-success btn-md add_item_btn" onclick="addMore()">
                                        <span class="glyphicon glyphicon-plus"></span> Add More
                                    </button>
                                    <button type="submit" class="btn btn-primary btn-md" id="submitQuiz">
                                        <span class="glyphicon glyphicon-ok"></span> Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="./script/insertQuizQuestion.js"></script>
</body>

</html>