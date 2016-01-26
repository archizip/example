@section('content')
<div class="site wrap">
    @include('layouts.sidebar')
    <div class="main wrap">
        <!-- Top users -->
        <topusers-Widget></topusers-Widget>
        <div class="content" ng-controller="guestProfileCtrl">
            <div class="container-fluid">
                <div class="row">
                    <div class="personal-left user-info">
                        <header class="user-name">
                            <h2 ng-init="genderclass=profile.gender=='1'? 'male':'female'">
                            <i class="icon icon-{[{genderclass}]}-25x24"></i>
                            <angular ng-cloak>{[{profile.nickname}]}<span ng-cloak ng-if="profile.years">,</span></angular>
                            <span style="display:none" id="user-id" data-id="{[{profile.id}]}" data-value="{[{profile.nickname}]}"></span>
                            <span ng-cloak ng-if="profile.years">
                                <span>{[{profile.years}]}</span>
                            </span>
                            <div ng-cloak class="editable">
                                <span class="location">
                                    <span ng-cloak ng-if="profile.location">
                                        {[{profile.location}]}
                                    </span>
                                    <span ng-cloak ng-if="! profile.location">
                                        {[{ tr('ui.user:profile:label:add-city') }]}
                                    </span>
                                </span>
                            </div>
                            </h2>
                            <span ng-cloak ng-if=" ! profile.online" class="status offline">
                                {[{ tr('ui.user:status:offline') }]}
                            </span>
                        </header>
                        <div id="user-avatar" class="user-avatar size2">
                            <div class="avatar-holder {[{getFieldData('ui.user:activity', profile.activity_id, 'data')}]} lvl2">
                                <div class="avatar-holder {[{getFieldData('ui.user:activity', profile.activity_id, 'data')}]} lvl1">
                                    <div class="avatar-holder {[{getFieldData('ui.user:activity', profile.activity_id, 'data')}]} lvl0">
                                        <div class="substrate white">
                                            <img class="img-circle center-block img-responsive" ng-src="{[{profile.photoBig}]}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="msg-box msg-box-lg" style="top: -154px;">
                                <div ng-cloak id="status-value">{[{profile.status}]}</div>
                            </div>
                            <span class="photo-count ">
                                <i class="icon icon-photo"></i>
                                кол фото
                            </span>
                        </div>
                        <span ng-cloak ng-if="profile.activity_id" class="user-status {[{getStatusField(profile.activity_id, 'label')}]}">
                            <i class="icon {[{getStatusField(profile.activity_id)}]}"></i>
                            {[{tr(getStatusField(profile.activity_id, 'name') + ":" + getStatusField(profile.activity_id, 'label'))}]}
                        </span>
                        <ul ng-if="profile.fields[getFieldType(pageData.fields['ui.user:preferences'])]" class="pref-prof user-preferences">
                            <li ng-repeat="pref in profile.fields[getFieldType(pageData.fields['ui.user:preferences'])]">
                                <img id="{[pref.id]}" ng-src="assets/ui/img/icons/{[{getFieldData('ui.user:preferences', pref.id, 'label')}]}.png" alt=""/>
                            </li>
                        </ul>
                        <div class="send-msg">
                            <header class="wrap">
                                <span ng-cloak class="pull-left">
                                    {[{ tr('ui.user:label:feeds') }]}
                                    {[{ profile.nickname }]}
                                </span>
                                <span class="pull-right">
                                    
                                </span>
                            </header>
                            <form ng-cloak>
                                <input ng-enter="addFeed()" ng-model="feedText" type="text" class="form-control feed" placeholder="{[{ tr('ui.user:label:feed-add') }]}">
                            </form>
                            </div><!-- /.send-msg -->
                            <div ng-cloak ng-if="profileFeed" class="wall">
                                <ul class="wall-list">
                                    <li ng-repeat="f in profileFeed" class="wall-item">
                                        <button ng-if="feedOwner(f.owner_id)" ng-click="removeFeed(f.id)" class="delete feed-remove" type="button" data-dismiss="alert">
                                        ×
                                        </button>
                                        <img class="img-circle pull-left" ng-src="{[{f.owner.photoSmall}]}" alt="{[{ f.owner.nickname }]}"/>
                                        <div class="wall-content">
                                            <div id="feed{[{ f.id }]}" class="wall-content-parent">
                                                <header>
                                                    <a href="{[{ f.owner.id }]}">
                                                        {[{ f.owner.nickname }]}
                                                    </a>
                                                    <span class="status is-{[{ f.owner.online ? 'online' : 'offline' }]}"></span>
                                                    <time>
                                                    {[{fromNow(f.created_at)}]}
                                                    </time>
                                                </header>
                                                <div class="msg-box msg-box-default msg-box-left">
                                                    {[{ f.content }]}
                                                </div>
                                                <footer class="meta-info">
                                                    <a data-id="{[{f.id}]}" class="reply-feed" href="#">
                                                        <span>
                                                            <i class="icon icon-reply"></i>
                                                            {[{ tr('ui.user:label:feed-response') }]}
                                                        </span>
                                                    </a>
                                                    <a data-id="{[{f.id}]}" class="reply-like" href="#">
                                                        <span>
                                                            <i class="icon icon-heart-sm"></i>
                                                            <span class="count">
                                                                {[{f.likes}]}
                                                            </span>
                                                            {[{ tr('ui.user:label:like') }]}
                                                        </span>
                                                    </a>
                                                    <div class="reply-form"  style="display:none">
                                                        <textarea ng-enter="addComment(null, f.id)" class="input-submit" ng-model="comments[f.id]" style="color:black" cols="30" rows="3"></textarea>
                                                        <br>
                                                        <a ng-click="addComment($event, f.id)" class="btn btn-primary" href="#">
                                                            {[{ tr('ui.user:profile:label:update') }]}
                                                        </a>
                                                    </div>
                                                </footer>
                                            </div>
                                            <!-- Feed replies -->
                                            <div ng-repeat="c in f.comments" class="wall-item reply">
                                                <button ng-if="feedOwner(c.owner_id)" ng-click="removeComment(f.id, c.id)" class="delete usercomment-remove" type="button" data-dismiss="alert">×</button>
                                                <img class="img-circle pull-left" ng-src="{[{c.owner.photoSmall}]}" alt="">
                                                <div class="wall-content">
                                                    <header>
                                                        <a href="{[{c.owner.id}]}">
                                                            <strong>
                                                            {[{c.owner.nickname}]}
                                                            </strong>
                                                        </a>
                                                        <span class="status is-{[{c.owner.online ? 'online' : 'offline' }]}"></span>
                                                        <time>
                                                        {[{fromNow(c.created_at)}]}
                                                        </time>
                                                    </header>
                                                    <div class="msg-box msg-box-default msg-box-left">
                                                        <p>{[{c.content}]}</p>
                                                    </div>
                                                <footer class="meta-info"></footer>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </li>
                            </ul>
                            </div><!-- /.wall -->
                            </div><!-- /.user-info-->
                            <div class="personal-right">
                                <div ng-cloak class="ct-chat">
                                    <a class="pull-left" href="#">
                                        {[{ tr('ui.user:meet:quick', 'header') }]}
                                    </a>
                                    <p>{[{ tr('ui.user:meet:quick', 'value') }]}</p>
                                </div>
                                <div ng-cloak class="personal-summary">
                                    <uib-tabset>
                                    <uib-tab ng-init="tabs[0].active = isActiveTab(0)" active="tabs[0].active"  select="setActiveTab(0)">
                                    <uib-tab-heading>
                                    <i class="icon icon-profile"></i>
                                    {[{ tr('ui.user:label:profile') }]}
                                    </uib-tab-heading>
                                    <div class="specifications">
                                        <table>
                                            <tr ng-if="profile.height">
                                                <td>{[{tr('ui.label:signup:appearance:input-height')}]}:</td>
                                                <td>
                                                    {[{profile.height}]}
                                                    {[{tr('ui.label:signup:appearance:input-height', 'header')}]}
                                                </td>
                                            </tr>
                                            <tr ng-if="profile.weight">
                                                <td>{[{tr('ui.label:signup:appearance:input-weight')}]}:</td>
                                                <td>
                                                    {[{profile.weight}]}
                                                    {[{tr('ui.label:signup:appearance:input-weight', 'header')}]}
                                                </td>
                                            </tr>
                                            <tr ng-repeat="field in profile.fields" ng-if="profileTabFields.indexOf(field.type) > -1">
                                                <td>{[{tr(field.name)}]}:</td>
                                                <td>{[{tr(field.name + ':' + field.label)}]}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <label ng-if="profile.tags.length">
                                        {[{ tr('ui.user:settings:label:preferences') }]}
                                    </label>
                                    <ul class="list-unstyled tag-profile" ng-cloak>
                                        <li ng-repeat="tag in profile.tags">
                                            {[{tag.text}]}
                                        </li>
                                    </ul>
                                    <label ng-if="profile.bodyTags.length">
                                        {[{ tr('ui.user:settings:label:body-decorations') }]}
                                    </label>
                                    <ul class="list-unstyled tag-profile" ng-cloak>
                                        <li ng-repeat="tag in profile.bodyTags">
                                            {[{tag.text}]}
                                        </li>
                                    </ul>
                                    </uib-tab>
                                    <uib-tab ng-init="tabs[1].active = isActiveTab(1)" active="tabs[1].active"  select="setActiveTab(1)">
                                    <uib-tab-heading>
                                    <i class="icon icon-photo"></i>
                                    {[{ tr('ui.user:label:photo') }]}
                                    </uib-tab-heading>
                                    <div id="albums">
                                        <ul class="album-list list-unstyled">
                                            <li ng-repeat="(key, album) in profile.albums track by $index" >
                                                <div class="album-wrap" ng-click="showGuestAlbum(key)">
                                                    <div class="album-info">
                                                        <div class="album-name">
                                                            {[{album.name}]}
                                                        </div>
                                                        <div class="visible-status" ng-repeat="perm in availableOptions | filter:album.permissions">
                                                            <img ng-src="assets/ui/img/icons/{[{perm.visible}]}.png" alt="">
                                                        </div>
                                                        <div class="album-description">
                                                            {[{album.description}]}
                                                        </div>
                                                    </div>
                                                    <a href="" ng-repeat="(ikey,img) in album.photos | sizeCover:'120x120' ">
                                                        <img ng-show="$last" ng-src="{[{img.path}]}{[{img.name}]}" alt="">
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="show-all-album" ng-if="profile.albums != 0" ng-click="showAll()">
                                            {[{tr('ui.user:profile:label:album:title:show')}]}
                                        </div>
                                    </div>
                                    </uib-tab>
                                    <uib-tab ng-init="tabs[2].active = isActiveTab(2)" active="tabs[2].active"  select="setActiveTab(2)">
                                    <uib-tab-heading>
                                    {[{ tr('ui.user:label:gifts') }]}
                                    </uib-tab-heading>
                                    <img class="img-responsive center-block" src="" alt=""/>
                                    </uib-tab>
                                    </uib-tabset>
                                    <div class="extra-info">
                                        <h4 ng-cloak>
                                        {[{ tr('ui.user:profile:passed_tests') }]}
                                        </h4>
                                        <ul class="list-inline">
                                            <li><a href="#"><i class="icon-big icon-heart"></i></a></li>
                                            <li><a href="#"><i class="icon-big icon-lightning"></i></a></li>
                                            <li><a href="#"><i class="icon-big icon-music"></i></a></li>
                                            <li><a href="#"><i class="icon-big icon-chat"></i></a></li>
                                        </ul>
                                    </div>
                                    <div ng-cloak class="extra-info">
                                        <h4 ng-if="profile.iwant">
                                        {[{ tr('ui.user:profile:label:iwant') }]}
                                        </h4>
                                        <p>
                                            {[{profile.iwant}]}
                                        </p>
                                    </div>
                                    </div><!-- ./personal-summary -->
                                    </div><!-- /.personal-right-->
                                    
                                    @include('partials.alike')
                                    
                                </div>
                            </div>
                            </div><!-- /.content -->
                            </div><!-- /.main-->
                        </div>
                        @stop