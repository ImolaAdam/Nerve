@extends('layouts.app')

@section('content')
<div class="container text">
    <div class="row">
        <div class="col-3 p-5">
            <img src="https://hottopic.scene7.com/is/image/HotTopic/12750928_hi?$productMainDesktop$" height="200px;" class="rounded-circle"></img>
        </div>
        <div class="col-9 pt-5">
            <div class = "d-flex justify-content-between align-items-baseline">
                <h1>{{ $user -> username}}</h1>

                @can('update', $user->profile)
                <a href = "/q/create">Új kérdés</a>
                @endcan

            </div>

            @can('update', $user->profile)
                <a href = "/profile/{{ $user->id}}/edit">Profil szerkesztése</a>
            @endcan

            <div class="d-flex">
                <div class="pr-5"><strong>{{ $user->questions->count() }}</strong> kérdés</div>
                <div class="pr-5"><strong>23k</strong> followers</div>
                <div class="pr-5"><strong>213</strong> following</div>
            </div>
            <div class="pt-4 font-weight-bold">{{ $user->profile->title }}</div>
            <div>{{ $user->profile->description }}</div>
        </div>
    </div>
    
    <div>
        @foreach($user->questions as $question)
        <div>
            <h2><strong>{{ $question->title }}</strong></h2>
            <div class="pb-4">{{ $question->description }}</div>
        </div>
        @endforeach
    </div>

</div>
@endsection