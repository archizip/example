@section('content')

    <div class="site wrap">
        <div class="main wrap">
        
	        <!-- Top users -->
	        <topusers-Widget></topusers-Widget>

	        <div class="content">
		        <div class="container-fluid">
		            <div class="row">

						<h2>{{ \Lang::get('ui.label:signup:preferences') }}</h2>
						<form id="preferences" method="post" action="#">
							
							<label for="input-likes">
								<h3>{{ \Lang::get('ui.label:signup:preferences:input-likes') }}</h3>
							</label>
							<br>
							<input id="input-likes" type="text" name="likes" value="">
							<br>
							<br>

							<div style="display:none" class="errors">
								<ul></ul>
							</div>

							<a class="btn btn-lg btn-primary text-uppercase preferences">
							 	{{ \Lang::get('ui.label:signup:preferences:next') }}
						 	</a>
						</form>
						
		            </div>
		        </div>
	        </div><!-- /.content -->

        </div><!-- /.main-->
    </div>

@stop

