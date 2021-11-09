@extends('layouts.app')

@section('content')
<div class="container text">
    <form action="/profile/{{ $user->id }}" enctype="multipart/form-data" method="post">
        @csrf
        @method('PATCH')

        <div class="row">
            <div class="col-8 offset-2">
                <div class="row">
                        <h1>Profil szerkesztése</h1>
                </div>

                <div class="form-group row">
                        <label for="title" class="col-md-4 col-form-label">Név</label> 
                        <input id="title"
                        type="text"
                        class="form-control @error('title') is-invalid @enderror"
                        name="title"
                        value="{{ old('title') ?? $user->profile->title}}"
                        required autocomplete="title" autofocus>

                            @error('title')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                                
                </div>

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label">Magamról</label> 
                    <input id="description"
                        name="description"
                        type="text"
                        class="form-control @error('description') is-invalid @enderror"
                        value="{{ old('description') ?? $user->profile->description}}"
                        required autocomplete="description" autofocus>
                    
                    @error('description')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                </div>

                <div class="row">
                    <label for="image" class="col-md-4 col-form-label">Profilkép</label> 
                    <input type="file" class="form-control-file" id="image" name="image">
                    
                    @error('image')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                </div>

                <div class="row pt-4">
                    <button class="btn btn-primary">Változtatások mentése</button>
                </div>

            </div>
         </div>
    </form>
</div>
@endsection