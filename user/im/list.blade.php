@section('content')
<div class="wrap">
    
    <!-- Sidebar -->
    @include('layouts.sidebar')
    
    <div class="main wrap">
        
        <!-- Top users -->
        <topusers-widget></topusers-widget>
        <div ng-controller="inboxPageCtrl" class="content">
            <div class="pm-list-header">
                <label for="your-dialogs">
                    {{ \Lang::get('ui.label:im:dialogs') }}
                </label>
                <input id="your-dialogs" ng-model="search" ng-keyup="searchIm($event, search)" type="text" placeholder="{{ \Lang::get('ui.label:im:search-messages') }}"/>
                <span class="all-messages">
                    <span class="color-success">
                        
                    </span>
                </span>
            </div>

            <!-- Messages list -->
            <friendslist-Widget></friendslist-Widget>
            
            <div id="loader" class="center-block"></div>
            <div id="nothing-found" class="center-block">
                {[{ tr('ui.inbox:not:found') }]}
            </div>
            
            <div class="pm-lists">
                <div  class="pm-lists-inner">
                    
                <listim-Widget></listim-Widget>
                
            </div>
        </div>
        
        </div><!-- /.content -->
    <addtopmessage-Widget></addtopmessage-Widget>
    </div><!-- /.main-->
</div>
@stop