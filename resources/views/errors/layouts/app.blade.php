<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Scripts -->
    {{--  <script src="{{ asset('js/app.js') }}" defer></script>  --}}

    <link rel="icon" href="{{ asset('favicon.ico')}}" type="image/x-icon"/>

    <link href="{{ asset('css/bootstrap.min.css')}}" rel="stylesheet"/>

    @yield('style')
</head>
<body>
    <!-- start loader -->
    <div id="pageloader-overlay" class="visible incoming"><div class="loader-wrapper-outer"><div class="loader-wrapper-inner"><div class="loader"></div></div></div></div>
    <!-- end loader -->
    <!-- Start wrapper-->
    <div id="wrapper">        
                @yield('content')
                <!--start overlay-->
                <div class="overlay toggle-menu"></div>
                <!--end overlay-->
        <!--Start Back To Top Button-->
        <a href="javaScript:void(0);" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
        <!--End Back To Top Button-->
        {{--  <!--Start footer-->
        <footer class="footer">
        <div class="container">
            <div class="text-center">
            Copyright © 2019 Demo Admin
            </div>
        </div>
        </footer>
        <!--End footer-->  --}}
       
    </div>
    <!-- Bootstrap core JavaScript-->
    <script src="{{asset('js/jquery.min.js')}}"></script>
    <script src="{{asset('js/bootstrap.min.js')}}"></script>
    @yield('script')
</body>
</html>
