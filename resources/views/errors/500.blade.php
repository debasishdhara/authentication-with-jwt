
@extends('errors.layouts.app')
@section('style')

@endsection
@section('content')
    <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center error-pages">
                        <h1 class="error-title text-secondary"> 500</h1>
                        <h2 class="error-sub-title">Internal server error</h2>

                        <p class="error-message text-uppercase">Please try after some time</p>
                        
                        <div class="mt-4">
                          <a href="{{route('home')}}" class="btn btn-dark btn-round m-1">Go To Home </a>
                          <a href="javascript:void(0);" class="btn btn-primary btn-round m-1">Previous Page </a>
                        </div>

                        <div class="mt-4">
                            <p class="">Copyright © 2019 Demo | All rights reserved.</p>
                        </div>
                           <hr class="w-50 border-light-2">
                        <div class="mt-2">
                            <a href="javascript:void(0)" class="btn-social btn-facebook btn-social-circle waves-effect waves-light m-1"><i class="fa fa-facebook"></i></a>
                            <a href="javascript:void(0)" class="btn-social btn-google-plus btn-social-circle waves-effect waves-light m-1"><i class="fa fa-google-plus"></i></a>
                            <a href="javascript:void(0)" class="btn-social btn-behance btn-social-circle waves-effect waves-light m-1"><i class="fa fa-behance"></i></a>
                            <a href="javascript:void(0)" class="btn-social btn-dribbble btn-social-circle waves-effect waves-light m-1"><i class="fa fa-dribbble"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		

        @endsection
        @section('script')
        
        @endsection
        