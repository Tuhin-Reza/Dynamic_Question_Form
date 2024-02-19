<?php
include './db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $questions = $_POST["question"];
    $optionA = $_POST["optionA"];
    $optionB = $_POST["optionB"];
    $optionC = $_POST["optionC"];
    $optionD = $_POST["optionD"];
    $correctOption = $_POST["correctOption"];

   
    $cid = "C100"; 
    $iid = "I50"; 
    $qzid = 1; 
    $point = 1;
    $tot_point = count($questions) * $point; 

    $checkQuery = "SELECT tot_point FROM certquestions WHERE qzid = $1";
    $checkParams = array($qzid);
    $checkResult = pg_query_params($conn, $checkQuery, $checkParams);

    if ($checkResult && pg_num_rows($checkResult) > 0) {
        $existingTotPoint = pg_fetch_result($checkResult, 0, 'tot_point');
        $tot_point += $existingTotPoint;
        $updateQuery = "UPDATE certquestions SET tot_point = $1 WHERE qzid = $2";
        $updateParams = array($tot_point, $qzid);
        $updateResult = pg_query_params($conn, $updateQuery, $updateParams);

        if (!$updateResult) {
            echo "Error updating tot_point: " . pg_last_error($conn);
        }
    }

    foreach ($questions as $index => $question) {
        $sql = "INSERT INTO certquestions (qtext, op_a, op_b, op_c, op_d, ans_op, point, tot_point, cid, iid, qzid) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

        $params = array($question, $optionA[$index], $optionB[$index], $optionC[$index], $optionD[$index], $correctOption[$index], $point, $tot_point, $cid, $iid, $qzid);
        $result = pg_query_params($conn, $sql, $params);

        if (!$result) {
            echo "Error: " . pg_last_error($conn);
        }
    }
    pg_close($conn);
    echo "Form submitted successfully!";
} else {
    echo "Error: Invalid request method!";
}
?>
