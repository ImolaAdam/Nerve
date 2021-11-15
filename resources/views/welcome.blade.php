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

                        @foreach($questions as $question)
                            <div class="d-flex align-items-center pt-4">
                                <div class="pr-3">
                                    <img src="{{ $question->user->profile->profileImage() }}" class="rounded-circle" style="max-width: 90px;"></img>
                                    <div>
                                        <a href="/profile/{{ $question->user->id }}" class="plink">{{ $question->user->username }}</a>
                                    </div>
                                </div>
                                <div>
                                    <a href="/a/{{ $question->id }}" class="qlink">
                                        @if( strlen($question->title) > 200)
                                            {{ substr($question->title, 0, 200) }}...
                                        @else
                                            {{ $question->title }}
                                        @endif
                                    </a>
                                    <div class="d-flex">
                                        <h6 class="pr-3">6 válasz</h6>
                                        <h6>
                                            <time datetime="{{ $question->created_at }}">
                                                {{ $question->created_at->diffForHumans() }}
                                            </time>
                                        </h6>
                                    </div>
                                    
                                </div>
                            </div>
                        @endforeach

                </div> 
            </div>
    
        </div>
    </body>
</html>

@endsection