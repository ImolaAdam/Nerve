<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnswersRequest;
use App\Models\Question;
use App\Models\User;
use App\Models\Answer;

class AnswersController extends Controller
{
    public function __construct()
    {

        $this->middleware('auth');
    }

    public function create(Question $question, User $user)
    {
        return view('answers.answer', compact('question', 'user'));
    }

    public function store(User $user, AnswersRequest $request) {

        $data = $request->validated();
        $answer = new Answer();

        $answer->user_id = $user->id;
        $answer->answer = $data['answer'];
        auth()->user()->answers()->create($data);

        return $answer;
    }

}
