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
                <a href = "#">Új kérdés</a>
            </div>
            <div class="d-flex">
                <div class="pr-5"><strong>153</strong> questions</div>
                <div class="pr-5"><strong>23k</strong> followers</div>
                <div class="pr-5"><strong>213</strong> following</div>
            </div>
            <div class="pt-4 font-weight-bold">{{ $user->profile->title }}</div>
            <div>{{ $user->profile->description }}</div>
        </div>
    </div>
    <h2><strong>Demon Slayer-hez és jujutsu kaisen-hez hasonló animék?</strong></h2>
    <div>Demon Slayer és jujutsu Kaisen nekem nagyon megtetszett, szóval ha tudtok hasonló animéket mondani, akkor azt nagyon megköszönném!<div>
</div>
@endsection