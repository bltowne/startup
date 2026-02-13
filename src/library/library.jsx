import React from 'react';
import "../app.css";

export function Library() {
  return (
    <main>
        <h2>Submit Question to the Question Library</h2>
        <p><i>Share your questions, answers, and scores with the community! Please keep your submissions family friendly.
            All submissions will enter the question library and may be chosen at random for future games.
        </i></p>
        <form>
            <div className="answer-container">
                <h3>Question:</h3>
                <input type="text" id="question" name="question" />
            </div>
            <div className="answer-container">
                <h3>Enter up to 8 answers:</h3>
                <input type="text" id="answer1" name="answer1" placeholder="Answer 1" className="answer"/><input type="text" id="points1" name="points1" placeholder="Points" className="points"/><br />
                <input type="text" id="answer2" name="answer2" placeholder="Answer 2" className="answer"/><input type="text" id="points2" name="points2" placeholder="Points" className="points"/><br />
                <input type="text" id="answer3" name="answer3" placeholder="Answer 3" className="answer"/><input type="text" id="points3" name="points3" placeholder="Points" className="points"/><br />
                <input type="text" id="answer4" name="answer4" placeholder="Answer 4" className="answer"/><input type="text" id="points4" name="points4" placeholder="Points" className="points"/><br />
                <input type="text" id="answer5" name="answer5" placeholder="Answer 5" className="answer"/><input type="text" id="points5" name="points5" placeholder="Points" className="points"/><br />
                <input type="text" id="answer6" name="answer6" placeholder="Answer 6" className="answer"/><input type="text" id="points6" name="points6" placeholder="Points" className="points"/><br />
                <input type="text" id="answer7" name="answer7" placeholder="Answer 7" className="answer"/><input type="text" id="points7" name="points7" placeholder="Points" className="points"/><br />
                <input type="text" id="answer8" name="answer8" placeholder="Answer 8" className="answer"/><input type="text" id="points8" name="points8" placeholder="Points" className="points"/>
            </div>
            <input type="submit" value="Submit" />
        </form>
        <br />
    </main>
  );
}