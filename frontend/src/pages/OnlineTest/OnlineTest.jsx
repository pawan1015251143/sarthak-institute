import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal/Modal';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  BarChart3,
  RefreshCw,
  AlertTriangle,
  Play,
  ArrowRight,
} from 'lucide-react';

const OnlineTest = () => {
  const { tests, testAttempts, addTestAttempt } = useUser();
  const { user } = useAuth();

  const [activeTest, setActiveTest] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [negativeMarkingEnabled, setNegativeMarkingEnabled] = useState(true);

  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [latestResult, setLatestResult] = useState(null);

  // Timer Countdown Effect
  useEffect(() => {
    let timer;
    if (activeTest && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTest, timeLeft]);

  const handleStartTest = (test) => {
    setActiveTest(test);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setTimeLeft(test.durationMinutes * 60); // convert minutes to seconds
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitTest = () => {
    if (!activeTest) return;

    let correctCount = 0;
    let wrongCount = 0;
    let score = 0;

    activeTest.questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected === undefined || selected === null) {
        // unattempted
      } else if (selected === q.correctIndex) {
        correctCount += 1;
        score += 1;
      } else {
        wrongCount += 1;
        if (negativeMarkingEnabled) {
          score -= activeTest.negativeMarkValue || 0.25;
        }
      }
    });

    const totalMarks = activeTest.questions.length;
    const percentage = Math.max(0, Math.round((score / totalMarks) * 100));
    const assignedRank = percentage >= 90 ? 1 : percentage >= 80 ? 2 : 5;

    const resultObj = {
      testId: activeTest.id,
      testTitle: activeTest.title,
      score: Number(score.toFixed(2)),
      totalMarks,
      percentage,
      rank: assignedRank,
      attemptDate: new Date().toISOString(),
      correctCount,
      wrongCount,
      answers: selectedAnswers,
      testQuestions: activeTest.questions,
    };

    addTestAttempt(resultObj);
    setLatestResult(resultObj);
    setResultModalOpen(true);
    setActiveTest(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          ONLINE EXAMINATION CENTER
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
          MCQ Online Tests &amp; Instant Score
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-4 text-base">
          Practice with timed chapter tests, toggle negative marking, and evaluate your national leaderboard rank.
        </p>
      </div>

      {/* Active Test Screen if running */}
      {activeTest ? (
        <div className="glass-card p-6 sm:p-10 border-2 border-primary-500/30 space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <div className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">
                {activeTest.classLevel} • {activeTest.subject}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeTest.title}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg ${
                  timeLeft < 300
                    ? 'bg-rose-50 dark:bg-rose-950 text-rose-600 animate-pulse'
                    : 'bg-primary-50 dark:bg-primary-950 text-primary-600'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={handleSubmitTest}
                className="btn-secondary py-2.5 px-6 text-sm"
              >
                <span>Submit Test</span>
              </button>
            </div>
          </div>

          {/* Question View */}
          {(() => {
            const q = activeTest.questions[currentQIndex];
            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-slate-500">
                    Question {currentQIndex + 1} of {activeTest.questions.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {negativeMarkingEnabled
                      ? 'Negative Marking: -0.25 for wrong answer'
                      : 'No Negative Marking'}
                  </span>
                </div>

                <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {q.question}
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[q.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(q.id, idx)}
                        className={`p-4 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 shadow-md'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>
                          <strong className="mr-2 text-slate-400">
                            {String.fromCharCode(65 + idx)}.
                          </strong>
                          {opt}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-primary-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Question Nav Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex((i) => Math.max(0, i - 1))}
              className="btn-outline py-2 px-5 text-xs disabled:opacity-50"
            >
              Previous Question
            </button>
            <div className="flex gap-1.5">
              {activeTest.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQIndex(i)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentQIndex === i
                      ? 'bg-primary-600 text-white'
                      : selectedAnswers[activeTest.questions[i].id] !== undefined
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentQIndex === activeTest.questions.length - 1}
              onClick={() =>
                setCurrentQIndex((i) =>
                  Math.min(activeTest.questions.length - 1, i + 1)
                )
              }
              className="btn-outline py-2 px-5 text-xs disabled:opacity-50"
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Available Test Cards & Negative Marking Toggle */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Available Online Tests
                </h2>
                <p className="text-xs text-slate-500">
                  Select a test below to start timed examination
                </p>
              </div>

              {/* Negative Marking Toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={negativeMarkingEnabled}
                  onChange={(e) => setNegativeMarkingEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Enable Negative Marking (-0.25)
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tests.map((t) => (
                <div
                  key={t.id}
                  className="glass-card-hover p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge-primary">{t.classLevel}</span>
                      <span className="text-xs font-bold text-slate-500">
                        {t.subject}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                      {t.title}
                    </h3>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary-500" />
                        <span>{t.durationMinutes} mins</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-primary-500" />
                        <span>{t.totalQuestions} MCQs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-secondary-500" />
                        <span>{negativeMarkingEnabled ? '-0.25' : 'No -ve'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartTest(t)}
                    className="btn-primary w-full py-3 text-sm font-bold"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Timed Test</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Attempts & Performance Analysis */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Previous Attempts &amp; Performance Analysis
            </h2>

            {testAttempts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testAttempts.map((att, i) => (
                  <div key={i} className="glass-card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="badge-secondary">Rank #{att.rank}</span>
                      <span className="text-xs text-slate-500">
                        {new Date(att.attemptDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {att.testTitle}
                    </h4>

                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center text-xs">
                      <div>
                        <div className="font-extrabold text-primary-600 dark:text-primary-400 text-base">
                          {att.score}
                        </div>
                        <div className="text-slate-500">Score</div>
                      </div>
                      <div>
                        <div className="font-extrabold text-emerald-600 text-base">
                          {att.correctCount}
                        </div>
                        <div className="text-slate-500">Correct</div>
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white text-base">
                          {att.percentage}%
                        </div>
                        <div className="text-slate-500">Percent</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setLatestResult(att);
                        setResultModalOpen(true);
                      }}
                      className="btn-outline w-full py-2 text-xs"
                    >
                      <span>View Correct Answers &amp; Explanations</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center text-slate-500 font-semibold">
                No previous test attempts yet. Start a test above to record your score!
              </div>
            )}
          </div>
        </>
      )}

      {/* Result & Solution Explanations Modal */}
      <Modal
        isOpen={resultModalOpen}
        onClose={() => setResultModalOpen(false)}
        title="Test Result & Leaderboard Analysis"
        maxWidth="max-w-4xl"
      >
        {latestResult && (
          <div className="space-y-6">
            {/* Score Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-700 text-white text-center space-y-2 shadow-lg">
              <div className="text-xs uppercase tracking-widest font-bold text-secondary-300">
                INSTANT SCORE &amp; RANK REPORT
              </div>
              <h3 className="text-3xl font-extrabold">
                Score: {latestResult.score} / {latestResult.totalMarks} ({latestResult.percentage}%)
              </h3>
              <p className="text-sm text-slate-200">
                Assigned Leaderboard Rank: <strong>#{latestResult.rank}</strong> • Correct: {latestResult.correctCount} | Wrong: {latestResult.wrongCount}
              </p>
            </div>

            {/* Leaderboard sample top rankers */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-secondary-500" />
                Top Rankers Leaderboard
              </h4>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 font-bold text-amber-800 dark:text-amber-300">
                  🥇 Rank #1: Aaditya Verma (100%)
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">
                  🥈 Rank #{latestResult.rank}: {user ? user.name : 'You'} ({latestResult.percentage}%)
                </div>
                <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 font-bold text-slate-600 dark:text-slate-400">
                  🥉 Rank #3: Sneha Mukherjee (92%)
                </div>
              </div>
            </div>

            {/* Answer Solutions & Explanations */}
            {latestResult.testQuestions && (
              <div className="space-y-4 pt-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Correct Answers &amp; Detailed Explanations
                </h4>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {latestResult.testQuestions.map((q, idx) => {
                    const userAns = latestResult.answers ? latestResult.answers[q.id] : undefined;
                    const isCorrect = userAns === q.correctIndex;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border-2 text-sm space-y-2 ${
                          isCorrect
                            ? 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20'
                            : 'border-rose-500/40 bg-rose-50/50 dark:bg-rose-950/20'
                        }`}
                      >
                        <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                          <span>Q{idx + 1}: {q.question}</span>
                          {isCorrect ? (
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              Correct (+1)
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                              Wrong
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          <strong>Your Answer: </strong>
                          {userAns !== undefined ? q.options[userAns] : 'Not Attempted'} |{' '}
                          <strong className="text-emerald-700 dark:text-emerald-400">
                            Correct Option: {q.options[q.correctIndex]}
                          </strong>
                        </div>
                        <div className="text-xs text-slate-500 italic bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                          <strong>Explanation: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OnlineTest;
