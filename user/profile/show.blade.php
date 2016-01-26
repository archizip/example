@section('content')

    <div class="site wrap">

        @include('layouts.sidebar')

        <div class="main wrap">

            <!-- Top users -->
            <topusers-Widget></topusers-Widget>

            <div class="content">
                <div class="container-fluid">

                    @if(\Auth::check())
                        @include('user.profile.authorized')
                    @else
                        @include('user.profile.guest')
                    @endif

                </div>
            </div><!-- /.content -->

        </div><!-- /.main-->

    </div>

@stop

