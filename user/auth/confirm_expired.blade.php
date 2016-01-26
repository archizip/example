@section('content')

    <div class="site wrap">
        <div class="main wrap">
        
	        <!-- Top users -->
            <topusers-Widget></topusers-Widget>

	        <div class="content">
		        <div class="container-fluid">
		            <div class="row">
					
					{{ \Lang::get('ui.label:signup:confirm-expired') }}	        		
	
		            </div>
		        </div>
	        </div><!-- /.content -->

        </div><!-- /.main-->
    </div>

@stop

