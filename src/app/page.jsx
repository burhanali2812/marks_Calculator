"use client";
import { useState } from "react";

export default function Home() {
  const [subjectName, setSubjectName] = useState("");
  const [subjectType, setSubjectType] = useState(""); // 'theory' or 'theory+lab'
  const [creditType, setCreditType] = useState(""); // '3,1' or '2,1'
  const [creditHours, setCreditHours] = useState("");

  // Theory marks
  const [assignments, setAssignments] = useState([{ value: "", total: 10 }]);
  const [quizzes, setQuizzes] = useState([{ value: "", total: 10 }]);
  const [midTerm, setMidTerm] = useState("");
  const [midTermTotal, setMidTermTotal] = useState(25);
  const [finalExam, setFinalExam] = useState("0");
  const [finalExamTotal, setFinalExamTotal] = useState(50);

  // Lab marks
  const [labAssignments, setLabAssignments] = useState([
    { value: "", total: 10 },
  ]);
  const [labMid, setLabMid] = useState("");
  const [labMidTotal, setLabMidTotal] = useState(25);
  const [labFinal, setLabFinal] = useState("0");
  const [labFinalTotal, setLabFinalTotal] = useState(50);

  const [showResults, setShowResults] = useState(false);

  const addAssignment = () => {
    setAssignments([...assignments, { value: "", total: 10 }]);
  };

  const addQuiz = () => {
    setQuizzes([...quizzes, { value: "", total: 10 }]);
  };

  const addLabAssignment = () => {
    setLabAssignments([...labAssignments, { value: "", total: 10 }]);
  };

  const removeAssignment = (index) => {
    const newAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(
      newAssignments.length > 0 ? newAssignments : [{ value: "", total: 10 }]
    );
  };

  const removeQuiz = (index) => {
    const newQuizzes = quizzes.filter((_, i) => i !== index);
    setQuizzes(newQuizzes.length > 0 ? newQuizzes : [{ value: "", total: 10 }]);
  };

  const removeLabAssignment = (index) => {
    const newLabAssignments = labAssignments.filter((_, i) => i !== index);
    setLabAssignments(
      newLabAssignments.length > 0
        ? newLabAssignments
        : [{ value: "", total: 10 }]
    );
  };

  const updateAssignment = (index, field, value) => {
    const newAssignments = [...assignments];
    newAssignments[index][field] = value;
    setAssignments(newAssignments);
  };

  const updateQuiz = (index, field, value) => {
    const newQuizzes = [...quizzes];
    newQuizzes[index][field] = value;
    setQuizzes(newQuizzes);
  };

  const updateLabAssignment = (index, field, value) => {
    const newLabAssignments = [...labAssignments];
    newLabAssignments[index][field] = value;
    setLabAssignments(newLabAssignments);
  };

  const calculateAggregate = () => {
    if (subjectType === "theory") {
      // Calculate theory only in actual marks
      const assignmentTotal =
        assignments.reduce((sum, a) => {
          const obtained = parseFloat(a.value) || 0;
          const total = parseFloat(a.total) || 10;
          return sum + (obtained / total) * 100;
        }, 0) / assignments.length;

      const quizTotal =
        quizzes.reduce((sum, q) => {
          const obtained = parseFloat(q.value) || 0;
          const total = parseFloat(q.total) || 10;
          return sum + (obtained / total) * 100;
        }, 0) / quizzes.length;

      const midObtained = parseFloat(midTerm) || 0;
      const midTotal = parseFloat(midTermTotal) || 100;
      const midMarks = (midObtained / midTotal) * 100;

      const finalObtained = parseFloat(finalExam) || 0;
      const finalTotal = parseFloat(finalExamTotal) || 100;
      const finalMarks = (finalObtained / finalTotal) * 100;

      // Calculate marks in each component (out of their weightage)
      const assignmentMarks = assignmentTotal * 0.1; // 10 marks
      const quizMarks = quizTotal * 0.15; // 15 marks
      const midTermMarks = midMarks * 0.25; // 25 marks
      const finalExamMarks = finalMarks * 0.5; // 50 marks

      const currentTotal =
        assignmentMarks + quizMarks + midTermMarks + finalExamMarks;

      // Calculate marks needed in final to pass (>50)
      const marksWithoutFinal = assignmentMarks + quizMarks + midTermMarks;
      const marksNeededInFinal = Math.max(0, 50 - marksWithoutFinal);
      const percentageNeededInFinal = marksNeededInFinal / 0.5; // Since final is 50% weightage

      return {
        type: "theory",
        assignmentMarks,
        quizMarks,
        midTermMarks,
        finalExamMarks,
        currentTotal,
        marksNeededInFinal,
        percentageNeededInFinal,
        totalAggregate: currentTotal,
      };
    } else {
      // Calculate theory + lab in actual marks
      const assignmentTotal =
        assignments.reduce((sum, a) => {
          const obtained = parseFloat(a.value) || 0;
          const total = parseFloat(a.total) || 100;
          return sum + (obtained / total) * 100;
        }, 0) / assignments.length;

      const quizTotal =
        quizzes.reduce((sum, q) => {
          const obtained = parseFloat(q.value) || 0;
          const total = parseFloat(q.total) || 10;
          return sum + (obtained / total) * 100;
        }, 0) / quizzes.length;

      const midObtained = parseFloat(midTerm) || 0;
      const midTotal = parseFloat(midTermTotal) || 100;
      const midMarks = (midObtained / midTotal) * 100;

      const finalObtained = parseFloat(finalExam) || 0;
      const finalTotal = parseFloat(finalExamTotal) || 100;
      const finalMarks = (finalObtained / finalTotal) * 100;

      // Theory marks (out of 100)
      const theoryAssignmentMarks = assignmentTotal * 0.1;
      const theoryQuizMarks = quizTotal * 0.15;
      const theoryMidMarks = midMarks * 0.25;
      const theoryFinalMarks = finalMarks * 0.5;
      const theoryTotal =
        theoryAssignmentMarks +
        theoryQuizMarks +
        theoryMidMarks +
        theoryFinalMarks;

      // Lab calculations (out of 100)
      const labAssignmentTotal =
        labAssignments.reduce((sum, a) => {
          const obtained = parseFloat(a.value) || 0;
          const total = parseFloat(a.total) || 100;
          return sum + (obtained / total) * 100;
        }, 0) / labAssignments.length;

      const labMidObtained = parseFloat(labMid) || 0;
      const labMidTotalVal = parseFloat(labMidTotal) || 100;
      const labMidMarks = (labMidObtained / labMidTotalVal) * 100;

      const labFinalObtained = parseFloat(labFinal) || 0;
      const labFinalTotalVal = parseFloat(labFinalTotal) || 100;
      const labFinalMarks = (labFinalObtained / labFinalTotalVal) * 100;

      const labAssignmentMarks = labAssignmentTotal * 0.25;
      const labMidTermMarks = labMidMarks * 0.25;
      const labFinalExamMarks = labFinalMarks * 0.5;
      const labTotal = labAssignmentMarks + labMidTermMarks + labFinalExamMarks;

      const theoryWeight = creditType === "3,1" ? 0.75 : 0.66;
      const labWeight = creditType === "3,1" ? 0.25 : 0.33;

      const currentTotal = theoryTotal * theoryWeight + labTotal * labWeight;

      // Calculate marks needed to pass (>50)
      const currentWithoutFinals =
        (theoryAssignmentMarks + theoryQuizMarks + theoryMidMarks) *
          theoryWeight +
        (labAssignmentMarks + labMidTermMarks) * labWeight;

      const marksNeededToPass = Math.max(0, 50 - currentWithoutFinals);

      return {
        type: "theory+lab",
        assignmentMarks: theoryAssignmentMarks,
       quizMarks:theoryQuizMarks,
        midTermMarks:theoryMidMarks,
        finalExamMarks:theoryFinalMarks,
        theoryTotal,
        labAssignmentMarks,
        labMidTermMarks,
        labFinalExamMarks,
        labTotal,
        theoryWeight: theoryWeight * 100,
        labWeight: labWeight * 100,
        currentTotal,
        marksNeededToPass,
        totalAggregate: currentTotal,
      };
    }
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSubjectName("");
    setSubjectType("");
    setCreditType("");
    setCreditHours("");
    setAssignments([{ value: "", total: 100 }]);
    setQuizzes([{ value: "", total: 10 }]);
    setMidTerm("");
    setMidTermTotal(100);
    setFinalExam("0");
    setFinalExamTotal(100);
    setLabAssignments([{ value: "", total: 100 }]);
    setLabMid("");
    setLabMidTotal(100);
    setLabFinal("0");
    setLabFinalTotal(100);
    setShowResults(false);
  };

  const results = showResults ? calculateAggregate() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-900 mb-2">
              COMSATS University Islamabad
            </h1>
            <p className="text-lg sm:text-xl text-indigo-700">
              Aggregate Calculator
            </p>
          </div>

          {/* Subject Name */}
          <div className="mb-6">
            <label className="block text-gray-800 font-semibold mb-2">
              Subject Name
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800"
              placeholder="Enter subject name"
            />
          </div>

          {/* Subject Type */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
              Subject Type
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setSubjectType("theory");
                  setCreditType("");
                }}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  subjectType === "theory"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Theory Only
              </button>
              <button
                onClick={() => setSubjectType("theory+lab")}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  subjectType === "theory+lab"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Theory + Lab
              </button>
            </div>
          </div>

          {/* Credit Hours */}
          {subjectType === "theory" && (
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Credit Hours
              </label>
              <input
                type="number"
                value={creditHours}
                onChange={(e) => setCreditHours(e.target.value)}
                className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800"
                placeholder="Enter credit hours"
              />
            </div>
          )}

          {subjectType === "theory+lab" && (
            <div className="mb-4 sm:mb-6">
              <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                Credit Hours Distribution
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setCreditType("3,1")}
                  className={`flex-1 py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                    creditType === "3,1"
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="hidden sm:inline">
                    (3,1) - Theory 75% / Lab 25%
                  </span>
                  <span className="sm:hidden">(3,1) - 75%/25%</span>
                </button>
                <button
                  onClick={() => setCreditType("2,1")}
                  className={`flex-1 py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                    creditType === "2,1"
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="hidden sm:inline">
                    (2,1) - Theory 66% / Lab 33%
                  </span>
                  <span className="sm:hidden">(2,1) - 66%/33%</span>
                </button>
              </div>
            </div>
          )}

          {subjectType && (
            <>
              {/* Theory Section */}
              <div className="bg-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-3 sm:mb-4">
                  Theory Component
                </h2>

                {/* Assignments */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <label className="text-gray-800 font-semibold text-sm sm:text-base">
                      Assignments (10%)
                    </label>
                    <button
                      onClick={addAssignment}
                      className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-xs sm:text-sm font-semibold w-full sm:w-auto"
                    >
                      + Add Assignment
                    </button>
                  </div>
                  {assignments.map((assignment, index) => (
                    <div key={index} className="flex gap-3 mb-3">
                      <div className="flex-1">
                        <input
                          type="number"
                          value={assignment.value}
                          onChange={(e) =>
                            updateAssignment(index, "value", e.target.value)
                          }
                          className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800"
                          placeholder="Obtained marks"
                        />
                      </div>
                      <span className="flex items-center text-gray-600 font-bold">
                        /
                      </span>
                      <div className="flex-1">
                        <input
                          type="number"
                          value={assignment.total}
                          onChange={(e) =>
                            updateAssignment(index, "total", e.target.value)
                          }
                          className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800"
                          placeholder="Total marks"
                        />
                      </div>
                      {assignments.length > 1 && (
                        <button
                          onClick={() => removeAssignment(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all font-semibold"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quizzes */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <label className="text-gray-800 font-semibold text-sm sm:text-base">
                      Quizzes (15%)
                    </label>
                    <button
                      onClick={addQuiz}
                      className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-xs sm:text-sm font-semibold w-full sm:w-auto"
                    >
                      + Add Quiz
                    </button>
                  </div>
                  {quizzes.map((quiz, index) => (
                    <div key={index} className="flex gap-3 mb-3">
                      <div className="flex-1">
                        <input
                          type="number"
                          value={quiz.value}
                          onChange={(e) =>
                            updateQuiz(index, "value", e.target.value)
                          }
                          className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800"
                          placeholder="Obtained marks"
                        />
                      </div>
                      <span className="flex items-center text-gray-600 font-bold">
                        /
                      </span>
                      <div className="flex-1">
                        <input
                          type="number"
                          value={quiz.total}
                          onChange={(e) =>
                            updateQuiz(index, "total", e.target.value)
                          }
                          className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800"
                          placeholder="Total marks"
                        />
                      </div>
                      {quizzes.length > 1 && (
                        <button
                          onClick={() => removeQuiz(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all font-semibold"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Midterm */}
                <div className="mb-4 sm:mb-6">
                  <label className="text-gray-800 font-semibold mb-2 block text-sm sm:text-base">
                    Midterm (25%)
                  </label>
                  <div className="flex gap-1 sm:gap-3 items-center">
                    <input
                      type="number"
                      value={midTerm}
                      onChange={(e) => setMidTerm(e.target.value)}
                      className="flex-1 min-w-0 px-1 sm:px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800 text-sm sm:text-base"
                      placeholder="Obtained"
                    />
                    <span className="flex items-center text-gray-600 font-bold text-sm sm:text-base">
                      /
                    </span>
                    <input
                      type="number"
                      value={midTermTotal}
                      onChange={(e) => setMidTermTotal(e.target.value)}
                      className="flex-1 min-w-0 px-1 sm:px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800 text-sm sm:text-base"
                      placeholder="Total"
                    />
                  </div>
                </div>

                {/* Final */}
                <div className="mb-4">
                  <label className="text-gray-800 font-semibold mb-2 block text-sm sm:text-base">
                    Final (50%)
                  </label>
                  <div className="flex gap-1 sm:gap-3 items-center">
                    <input
                      type="number"
                      value={finalExam}
                      onChange={(e) => setFinalExam(e.target.value)}
                      className="flex-1 min-w-0 px-1 sm:px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800 text-sm sm:text-base"
                      placeholder="Obtained"
                    />
                    <span className="flex items-center text-gray-600 font-bold text-sm sm:text-base">
                      /
                    </span>
                    <input
                      type="number"
                      value={finalExamTotal}
                      onChange={(e) => setFinalExamTotal(e.target.value)}
                      className="flex-1 min-w-0 px-1 sm:px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800 text-sm sm:text-base"
                      placeholder="Total"
                    />
                  </div>
                </div>
              </div>

              {/* Lab Section */}
              {subjectType === "theory+lab" && (
                <div className="bg-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mb-3 sm:mb-4">
                    Lab Component
                  </h2>

                  {/* Lab Assignments */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                      <label className="text-gray-800 font-semibold text-sm sm:text-base">
                        Lab Assignments (25%)
                      </label>
                      <button
                        onClick={addLabAssignment}
                        className="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-700 transition-all text-xs sm:text-sm font-semibold w-full sm:w-auto"
                      >
                        + Add Lab Assignment
                      </button>
                    </div>
                    {labAssignments.map((assignment, index) => (
                      <div key={index} className="flex gap-3 mb-3">
                        <div className="flex-1">
                          <input
                            type="number"
                            value={assignment.value}
                            onChange={(e) =>
                              updateLabAssignment(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800"
                            placeholder="Obtained marks"
                          />
                        </div>
                        <span className="flex items-center text-gray-600 font-bold">
                          /
                        </span>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={assignment.total}
                            onChange={(e) =>
                              updateLabAssignment(
                                index,
                                "total",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800"
                            placeholder="Total marks"
                          />
                        </div>
                        {labAssignments.length > 1 && (
                          <button
                            onClick={() => removeLabAssignment(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all font-semibold"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Lab Midterm */}
                  <div className="mb-4 sm:mb-6">
                    <label className="text-gray-800 font-semibold mb-2 block text-sm sm:text-base">
                      Lab Midterm (25%)
                    </label>
                    <div className="flex gap-1 sm:gap-3 items-center">
                      <input
                        type="number"
                        value={labMid}
                        onChange={(e) => setLabMid(e.target.value)}
                        className="flex-1 min-w-0 px-1 sm:px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800 text-sm sm:text-base"
                        placeholder="Obtained"
                      />
                      <span className="flex items-center text-gray-600 font-bold text-sm sm:text-base">
                        /
                      </span>
                      <input
                        type="number"
                        value={labMidTotal}
                        onChange={(e) => setLabMidTotal(e.target.value)}
                        className="flex-1 min-w-0 px-1 sm:px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800 text-sm sm:text-base"
                        placeholder="Total"
                      />
                    </div>
                  </div>

                  {/* Lab Final */}
                  <div className="mb-4">
                    <label className="text-gray-800 font-semibold mb-2 block text-sm sm:text-base">
                      Lab Final (50%)
                    </label>
                    <div className="flex gap-1 sm:gap-3 items-center">
                      <input
                        type="number"
                        value={labFinal}
                        onChange={(e) => setLabFinal(e.target.value)}
                        className="flex-1 min-w-0 px-1 sm:px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800 text-sm sm:text-base"
                        placeholder="Obtained"
                      />
                      <span className="flex items-center text-gray-600 font-bold text-sm sm:text-base">
                        /
                      </span>
                      <input
                        type="number"
                        value={labFinalTotal}
                        onChange={(e) => setLabFinalTotal(e.target.value)}
                        className="flex-1 min-w-0 px-1 sm:px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800 text-sm sm:text-base"
                        placeholder="Total"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-indigo-600 text-white py-3 sm:py-4 rounded-lg hover:bg-indigo-700 transition-all font-bold text-base sm:text-lg shadow-lg"
                >
                  Calculate Aggregate
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-500 text-white py-3 sm:py-4 rounded-lg hover:bg-gray-600 transition-all font-bold text-base sm:text-lg shadow-lg"
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-4 sm:mb-6 text-center">
              Results
            </h2>

            {subjectName && (
              <div className="text-center mb-6">
                <p className="text-xl text-gray-700">
                  Subject:{" "}
                  <span className="font-bold text-indigo-700">
                    {subjectName}
                  </span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Theory Results */}
              <div className="bg-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mb-3 sm:mb-4">
                  Theory Component
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-700">Assignments (10%):</span>
                    <span className="font-bold text-indigo-700">
                      {results.assignmentMarks?.toFixed(2)} / 10
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-700">Quizzes (15%):</span>
                    <span className="font-bold text-indigo-700">
                      {results.quizMarks?.toFixed(2)} / 15
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-700">Midterm (25%):</span>
                    <span className="font-bold text-indigo-700">
                      {results.midTermMarks?.toFixed(2)} / 25
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-700">Final (50%):</span>
                    <span className="font-bold text-indigo-700">
                      {results.finalExamMarks?.toFixed(2)} / 50
                    </span>
                  </div>
                  <div className="border-t-2 border-indigo-300 pt-3 mt-3">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-800 font-semibold">
                        {results.type === "theory"
                          ? "Current Total:"
                          : "Theory Total:"}
                      </span>
                      <span className="font-bold text-indigo-900 text-lg sm:text-xl">
                        {results.type === "theory"
                          ? results.currentTotal?.toFixed(2)
                          : results.theoryTotal?.toFixed(2)}{" "}
                        / 100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab Results */}
              {results.type === "theory+lab" && (
                <div className="bg-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-3 sm:mb-4">
                    Lab Component
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-700">
                        Lab Assignments (25%):
                      </span>
                      <span className="font-bold text-purple-700">
                        {results.labAssignmentMarks?.toFixed(2)} / 25
                      </span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-700">Lab Midterm (25%):</span>
                      <span className="font-bold text-purple-700">
                        {results.labMidTermMarks?.toFixed(2)} / 25
                      </span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-700">Lab Final (50%):</span>
                      <span className="font-bold text-purple-700">
                        {results.labFinalExamMarks?.toFixed(2)} / 50
                      </span>
                    </div>
                    <div className="border-t-2 border-purple-300 pt-3 mt-3">
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-800 font-semibold">
                          Lab Total:
                        </span>
                        <span className="font-bold text-purple-900 text-lg sm:text-xl">
                          {results.labTotal?.toFixed(2)} / 100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Weighted Distribution */}
            {results.type === "theory+lab" && (
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3">
                  Weighted Distribution
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-700">Theory Weight:</span>
                    <span className="font-bold text-indigo-700">
                      {results.theoryWeight}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-700">Lab Weight:</span>
                    <span className="font-bold text-purple-700">
                      {results.labWeight}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Final Aggregate */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                Total Aggregate
              </h3>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                {results.totalAggregate?.toFixed(2)} / 100
              </p>
              <p className="text-indigo-100 mt-3 text-lg">
                {results.totalAggregate >= 85
                  ? "Excellent!"
                  : results.totalAggregate >= 70
                  ? "Great Job!"
                  : results.totalAggregate >= 60
                  ? "Good Work!"
                  : results.totalAggregate >= 50
                  ? "Passed!"
                  : "Need Improvement"}
              </p>
            </div>

            {/* Marks Needed to Pass */}
            {results.totalAggregate < 50 && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-900 mb-2 sm:mb-3">
                  📊 Marks Needed in Final to Pass
                </h3>
                {results.type === "theory" ? (
                  <>
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-700 mb-2">
                      {results.marksNeededInFinal?.toFixed(2)} marks
                    </p>
                    <p className="text-sm sm:text-base text-gray-700">
                      You need{" "}
                      <span className="font-bold">
                        {results.percentageNeededInFinal?.toFixed(2)}%
                      </span>{" "}
                      in your final exam to pass (total &gt; 50)
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-700 mb-2">
                      {results.marksNeededToPass?.toFixed(2)} marks
                    </p>
                    <p className="text-sm sm:text-base text-gray-700">
                      You need this combined from theory final and lab final to
                      pass (total &gt; 50)
                    </p>
                  </>
                )}
              </div>
            )}

            {results.totalAggregate >= 50 && (
              <div className="bg-green-50 border-2 border-green-400 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2">
                  ✅ Congratulations!
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  You have already passed with{" "}
                  <span className="font-bold text-green-700">
                    {results.totalAggregate?.toFixed(2)} marks
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-6 mt-8">
          <p className="text-gray-600 text-sm sm:text-base">
            © 2025 Syed Burhan Ali
          </p>
        </footer>
      </div>
    </div>
  );
}
