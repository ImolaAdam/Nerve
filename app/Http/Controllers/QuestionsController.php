<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function __construct() {

        $this->middleware('auth');
    }

    public function create() {

        return view('questions.create');
    }

    public function store() {

        $data = request()->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        auth()->user()->questions()->create($data);

        return redirect('/profile/' . auth()->user()->id);
    }
}
