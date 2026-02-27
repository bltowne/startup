import React from 'react';
import "../app.css";

export function Library() {
    const [question, setQuestion] = React.useState("");
    const [answers, setAnswers] = React.useState(Array(8).fill(""));
    const [points, setPoints] = React.useState(Array(8).fill(""));

    function submitData(question, answers, points) {
        const newData = {
            question: question,
            answers: answers,
            points: points
        };
        processData(newData);
        setQuestion("");
        setAnswers(Array(8).fill(""));
        setPoints(Array(8).fill(""));
    }

    function processData(newData) {
        let data = [];
        const dataText = localStorage.getItem('data');
        if (dataText) {
            data = JSON.parse(dataText);
        }

        data.push(newData);
        localStorage.setItem('data', JSON.stringify(data));
    }

    function getQuestion(e) {
      setQuestion(e.target.value);
    }

    function getAnswer(e, index) {
        const value = e.target.value;
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[index] = value;
            return newAnswers;
        });
    }

    function getPoints(e, index) {
        const value = e.target.value;
        setPoints(prev => {
            const newPoints = [...prev];
            newPoints[index] = value;
            return newPoints;
        });
    }

    return (
    <main>
        <h2>Submit Question to the Question Library</h2>
        <p><i>Share your questions, answers, and scores with the community! Please keep your submissions family friendly.
            All submissions will enter the question library and may be chosen at random for future games.
        </i></p>
        <div className="answer-container">
            <h3>Question:</h3>
            <input type="text" id="question" name="question" onChange={getQuestion} value={question}/>
        </div>
        <div className="answer-container">
            <h3>Enter up to 8 answers:</h3>
            <input type="text" id="answer1" name="answer1" placeholder="Answer 1" onChange={(e) => getAnswer(e, 0)} value={answers[0]} className="answer"/><input type="text" id="points1" name="points1" placeholder="Points" onChange={(e) => getPoints(e, 0)} value={points[0]} className="points"/><br />
            <input type="text" id="answer2" name="answer2" placeholder="Answer 2" onChange={(e) => getAnswer(e, 1)} value={answers[1]} className="answer"/><input type="text" id="points2" name="points2" placeholder="Points" onChange={(e) => getPoints(e, 1)} value={points[1]} className="points"/><br />
            <input type="text" id="answer3" name="answer3" placeholder="Answer 3" onChange={(e) => getAnswer(e, 2)} value={answers[2]} className="answer"/><input type="text" id="points3" name="points3" placeholder="Points" onChange={(e) => getPoints(e, 2)} value={points[2]} className="points"/><br />
            <input type="text" id="answer4" name="answer4" placeholder="Answer 4" onChange={(e) => getAnswer(e, 3)} value={answers[3]} className="answer"/><input type="text" id="points4" name="points4" placeholder="Points" onChange={(e) => getPoints(e, 3)} value={points[3]} className="points"/><br />
            <input type="text" id="answer5" name="answer5" placeholder="Answer 5" onChange={(e) => getAnswer(e, 4)} value={answers[4]} className="answer"/><input type="text" id="points5" name="points5" placeholder="Points" onChange={(e) => getPoints(e, 4)} value={points[4]} className="points"/><br />
            <input type="text" id="answer6" name="answer6" placeholder="Answer 6" onChange={(e) => getAnswer(e, 5)} value={answers[5]} className="answer"/><input type="text" id="points6" name="points6" placeholder="Points" onChange={(e) => getPoints(e, 5)} value={points[5]} className="points"/><br />
            <input type="text" id="answer7" name="answer7" placeholder="Answer 7" onChange={(e) => getAnswer(e, 6)} value={answers[6]} className="answer"/><input type="text" id="points7" name="points7" placeholder="Points" onChange={(e) => getPoints(e, 6)} value={points[6]} className="points"/><br />
            <input type="text" id="answer8" name="answer8" placeholder="Answer 8" onChange={(e) => getAnswer(e, 7)} value={answers[7]} className="answer"/><input type="text" id="points8" name="points8" placeholder="Points" onChange={(e) => getPoints(e, 7)} value={points[7]} className="points"/>
        </div>
        <input type="submit" value="Submit" onClick={() => submitData(question, answers, points)} />
        <br />
    </main>
    );
}