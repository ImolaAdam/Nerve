<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\User;

class HomeController extends Controller
{
    /**
     * Show the homepage.
     * @return View
     */

    public function index(Question $questions, User $user)
    {
        $questions = Question::orderBy('created_at', 'desc')->paginate(10);
        $users = User::orderBy('created_at', 'desc')->paginate(10);
        
        return view('./welcome', compact('questions', 'users'));
    }
}
