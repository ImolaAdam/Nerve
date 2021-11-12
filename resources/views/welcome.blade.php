@extends('layouts.app')

@section('content')
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Nerve</title>
    </head>
    <body>
        <h1 class="text p-5" style="font-size: 40px;"><strong>Nerve - Kérdezz bátran!</strong></h1>
        
        <div class="text d-flex pr-3">
            <div class="p-5">
                <h2>Témák</h2>
                    <a href="#">Anime</a>
                    <a href="#">Programozás</a>
                    <a href="#">Filmek</a>
                    <a href="#">Állatok</a>
                    <a href="#">Könyvek</a>
                </div>

            <div class="pl-4">
                <h2 class="pb-2"><strong>Kérdések</strong></h2>
                <div>

                    @foreach($users as $user)
                        @foreach($user->questions as $question)
                            <div class="d-flex align-items-center pt-4">
                                <div class="pr-3">
                                    <img src="{{ $user->profile->profileImage() }}" class="rounded-circle" style="max-width: 90px;"></img>
                                    <div>
                                        <a href="/profile/{{ $user->id}}" class="plink">{{ $user->username }}</a>
                                    </div>
                                </div>
                                <div>
                                    <a href="/a/{{ $question->id }}" class="qlink">{{ $question->title }}</a>
                                    <div>6 válasz</div>
                                </div>
                            </div>
                        @endforeach
                    @endforeach

                </div> 
            </div>
    
        </div>
    </body>
</html>

@endsection