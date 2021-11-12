@extends('layouts.app')

@section('content')
<div class="container text">
    <form action="/q" enctype="multipart/form-data" method="post">
        @csrf

        <div class="row">
            <div class="col-8 offset-2">
                <div class="row">
                        <h1>Kérdés feltevése</h1>
                </div>

                <div class="form-group row">
                    <label for="title" class="col-md-4 col-form-label">Kérdés</label> 
                    <input id="title"
                    type="text"
                    class="form-control @error('title') is-invalid @enderror"
                    name="title"
                    value="{{ old('title') }}"
                    required autocomplete="title" autofocus>

                    @error('title')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                                
                </div>

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label">Megjegyzés</label> 
                    <input id="description"
                        name="description"
                        type="text"
                        class="form-control @error('description') is-invalid @enderror"
                        value="{{ old('description') }}"
                        required autocomplete="description" autofocus>
                    
                    @error('description')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                    @enderror
                </div>

                <div class="row pt-4">
                    <button class="btn btn-primary">Új kérdés hozzáadása</button>
                </div>

            </div>
         </div>
    </form>
</div>
@endsection