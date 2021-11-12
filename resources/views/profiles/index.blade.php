@extends('layouts.app')

@section('content')
<div class="container text">
    <div class="row">
        <div class="col-3 p-5">
            <img src="{{ $user->profile->profileImage() }}" class="rounded-circle w-100"></img>
        </div>
        <div class="col-9 pt-5">
            <div class = "d-flex justify-content-between align-items-baseline pb-3">
                    <h1>{{ $user -> username}}</h1>
                 
                @can('update', $user->profile)
                <a href = "/q/create" class="btn btn-primary">Új kérdés</a>
                @endcan

            </div>

            @can('update', $user->profile)
                <a href = "/profile/{{ $user->id}}/edit" class="btn btn-primary" style="float: right;">Profil szerkesztése</a>
            @endcan

            <div class="d-flex">
                <div class="pr-5"><strong>{{ $user->questions->count() }}</strong> kérdés</div>
            </div>
            <div class="pt-4 font-weight-bold">{{ $user->profile->title }}</div>
            <div>{{ $user->profile->description }}</div>
        </div>
    </div>
    
    <div>
        @foreach($user->questions as $question)
        <div class="d-flex align-items-center pt-4">
            <div class="pr-3">
                <img src="{{ $user->profile->profileImage() }}" class="rounded-circle" style="max-width: 90px;"></img>
            </div>
            <div>
                <h3>{{ $question->title }}</h3>
                <h5>{{ $question->description }}</h5>
            </div>
        </div>
        @endforeach
    </div>

</div>
@endsection