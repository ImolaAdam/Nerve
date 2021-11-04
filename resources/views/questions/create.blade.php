@extends('layouts.app')

@section('content')
<div class="container text">
    <form action="">
        <div class="row">
            <div class="col-8 offset-2">
                <div class="form-group row">
                        <label for="title" class="col-md-4 col-form-label">Kérdés</label> 
                        <input id="title"
                        type="text"
                        class="form-control @error('title') is-invalid @enderror"
                        title="title"
                        value="{{ old('title') }}"
                        required autocomplete="title" autofocus>

                            @error('title')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                                
                </div>

                <div class="row">
                    <label for="description" class="col-md-4 col-form-label">Megjegyzés</label> 
                    <input type="text" class="" id="description">
                    
                    @error('title')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                </div>

            </div>
         </div>
    </form>
</div>
@endsection