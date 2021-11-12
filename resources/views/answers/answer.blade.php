@extends('layouts.app')

@section('content')
    <div class="container">
        <h1 class="text p-5" style="font-size: 40px;">Nerve - Kérdezz bátran!</h1>

        <div class="d-flex align-items-center pt-4 text">
            <div class="pr-3">
                <img src="{{ $question->user->profile->profileImage() }}" class="rounded-circle" style="max-width: 90px;"></img>
                <div>
                    <a href="/profile/{{ $user->id}}" class="plink">{{ $question->user->username }}</a>
                </div>
            </div>
            <div>
                <h3>{{ $question->title }}</h3>
                <h5>{{ $question->description }}</h5>
                <div>6 válasz</div>
            </div>
        </div>

        <div>
            <form action="/a" enctype="multipart/form-data" method="post">
                @csrf

                <h2 class="text pl-5 pt-5 pb-2">Eddigi válaszok:</h2>
                <div>
                @foreach($user->answers as $answer)
                    <div class="d-flex align-items-center pt-4">
                        <div class="pr-3">
                            <img src="{{ $user->profile->profileImage() }}" class="rounded-circle" style="max-width: 90px;"></img>
                        </div>
                        <div>
                            <h5>{{ $answer->answer }}</h5>
                        </div>
                    </div>
                @endforeach
                </div>

                <div class="row pl-5">
                    <div class="col-8 offset-2">

                        <div class="form-group row text">
                            <label for="answer" class="col-md-4 col-form-label">Válasz</label> 
                            <input id="answer"
                            type="text"
                            class="form-control @error('answer') is-invalid @enderror"
                            name="answer"
                            value="{{ old('answer') }}"
                            required autocomplete="answer" autofocus>

                            @error('answer')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                                        
                        </div>

                        <div class="row pt-4">
                            <button class="btn btn-primary">Válasz hozzáadása</button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection