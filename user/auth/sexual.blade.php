@section('content')

    <div class="site wrap">
        <div class="main wrap">
        
	        <!-- Top users -->
	        <topusers-Widget></topusers-Widget>

	        <div class="content">
		        <div class="container-fluid">
		            <div class="row">

						<h2>{{ \Lang::get('ui.label:signup:preferences') }}</h2>
						<form id="sexual" method="post" action="#">
							
							<label for="input-likes">
								<h3>{{ \Lang::get('ui.label:signup:preferences:input-likes') }}</h3>
							</label><br>
							<input class="typeahead-tag" id="search-tag" type="text" name="tag" value="" placeholder="" />
							<br>
							<br>

							<div style="display:none" class="errors">
								<ul></ul>
							</div>

							<a class="btn btn-lg btn-primary text-uppercase sexual">
							 	{{ \Lang::get('ui.label:signup:sexual:next') }}
						 	</a>
						</form>
						
		            </div>
		        </div>
	        </div><!-- /.content -->

        </div><!-- /.main-->
    </div>

@stop

