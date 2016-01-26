@section('content')
<div class="site wrap">
	@include('layouts.sidebar')
	
	<div class="main wrap" ng-controller="profileEditCtrl">
		<!-- Top users -->
		<topusers-Widget></topusers-Widget>
		<div class="content">
			<div class="container-fluid">
				<div class="row">
					<div class="personal-left user-info">
						<header class="user-name">
							<h2 >
							<img class="sidebar-gender" ng-if="user.gender_id" ng-src="assets/ui/img/icons/{[{getGenderSymbol(user.gender_id)}]}.png" alt="">
							<angular ng-cloak>{[{user.nickname}]}<span ng-cloak ng-if="user.years">,</span></angular>
							<span style="display:none" id="user-id" data-id="{[{user.id}]}" data-value="{[{user.nickname}]}"></span>
							<span ng-cloak ng-if="user.years">
								<span>{[{user.years}]}</span>
							</span>
							<div ng-cloak class="editable">
								<span class="location">
									<span ng-cloak ng-if="user.location">
										{[{user.location}]}
									</span>
									<span ng-cloak ng-if="! user.location">
										{[{ tr('ui.user:profile:label:add-city') }]}
									</span>
									<a ng-cloak class="edit-link hover-text" data-name="country" href="{{url('settings')}}">
										<i class="icon icon-edit"></i>
										{[{ tr('ui.user:profile:label:edit') }]}
									</a>
								</span>
							</div>
							</h2>
							<span ng-cloak class="status online">
								{[{ tr('ui.user:status:online') }]}
							</span>
						</header>
						<div ng-cloak id="user-avatar" class="user-avatar size2">
							<div class="avatar-holder {[{getFieldData('ui.user:activity', user.activity_id, 'data')}]} lvl2">
								<div class="avatar-holder {[{getFieldData('ui.user:activity', user.activity_id, 'data')}]} lvl1">
									<div class="avatar-holder {[{getFieldData('ui.user:activity', user.activity_id, 'data')}]} lvl0">
										<div class="substrate white">
											<img class="img-circle center-block img-responsive" ng-src="{[{user.photoBig}]}">
										</div>
									</div>
								</div>
							</div>
							<div class="editable">
								<div class="msg-box msg-box-lg">
									<div id="status-value" ng-cloak>{[{user.status}]}</div>
									<a ng-cloak href="#" data-name="status" class="edit-link edit-button">
										{[{ tr('ui.user:profile:label:edit-text') }]}
									</a>
									<!-- Status edit -->
									<div style="display:none" class="status-edit edit-form">
										<form action="#">
											<textarea ng-init="status=user.status" class="edit-input" ng-model="status" name="status" cols="30" rows="5"></textarea>
											<br>
											<a ng-cloak ng-click="update('status', status)" class="btn btn-primary update-field" data-name="status" href="#">
												{[{ tr('ui.user:profile:label:update') }]}
											</a>
										</form>
									</div>
								</div>
							</div>
							<div ng-cloak id="href-like-input" class="avatar-edit-link" >
								<i class="icon icon-edit-big"></i>
								<div class="input-avatar" ngf-select="upload($file)">
									{[{ tr('ui.user:profile:label:edit-photo') }]}
								</div>
							</div>
						</div>
						<!-- User status select -->
						<div class="status-select">
							<div class="status_id-edit">
								<select
									ng-options="option.id as option.key for option in pageData.fields['ui.user:activity']"
									ng-model="user.activity_id">
								</select>
							</div>
						</div>
						<div>
							<ul ng-if="user.fields[getFieldType(pageData.fields['ui.user:preferences'])]" class="pref-prof user-preferences">
								<li ng-repeat="pref in user.fields[getFieldType(pageData.fields['ui.user:preferences'])]">
									<img id="{[pref.id]}" ng-src="assets/ui/img/icons/{[{getFieldData('ui.user:preferences', pref.id, 'label')}]}.png" alt=""/>
								</li>
							</ul>
							<a ng-cloak href="{{url('settings')}}" data-name="preferences" class="edit-link hover-text">
								<i class="icon icon-edit"></i>
								{[{ tr('ui.user:profile:label:edit-text') }]}
							</a>
							
						</div>
						<div class="send-msg">
							<header class="wrap">
								<span ng-cloak class="pull-left">
									{[{ tr('ui.user:label:feeds') }]}
									{[{ user.nickname }]}
								</span>
								<span class="pull-right">
									{{ \Utility\Common::formatPlural(\Auth::user()->feed->count(), \Lang::get('ui.label:row'), \Lang::get('ui.label:rows'), \Lang::get('ui.label:rowss')) }}
								</span>
							</header>
							<form>
								<input ng-cloak ng-enter="addFeed()" type="text" class="form-control feed" ng-model="feedText" placeholder="{[{ tr('ui.user:label:feed-add') }]}"/>
							</form>
							</div><!-- /.send-msg -->
							<!-- User feed -->
							<div ng-cloak ng-if="userFeed" class="wall">
								<ul class="wall-list">
									<li ng-repeat="f in userFeed" class="wall-item">
										<button ng-click="removeFeed(f.id)" class="delete feed-remove" type="button" data-dismiss="alert">×</button>
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
														<form action="#">
															<textarea ng-enter="addComment(null, f.id)" class="input-submit" ng-model="comments[f.id]" style="color:black" cols="30" rows="3"></textarea>
															<br>
															<a ng-click="addComment($event, f.id)" class="btn btn-primary" href="#">
																{[{ tr('ui.user:profile:label:update') }]}
															</a>
														</form>
													</div>
												</footer>
											</div>
											<!-- Feed replies -->
											<div ng-repeat="c in f.comments" class="wall-item reply">
												<button ng-click="removeComment(f.id, c.id)" class="delete usercomment-remove" type="button" data-dismiss="alert">×</button>
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
								<div ng-cloak class="personal-summary">
								{[{activeTab}]}
									<uib-tabset>
									<uib-tab ng-init="tabs[0].active = isActiveTab(0)" active="tabs[0].active"  select="setActiveTab(0)">
									<uib-tab-heading>
									<i class="icon icon-profile"></i>
									{[{ tr('ui.user:label:profile') }]}
									<a href="/settings" class="edit-link"><i class="icon icon-edit"></i></a>
									</uib-tab-heading>
									<div ng-cloak class="specifications">
										<table>
											<tr ng-if="user.height">
												<td>{[{tr('ui.label:signup:appearance:input-height')}]}:</td>
												<td>
													{[{user.height}]}
													{[{tr('ui.label:signup:appearance:input-height', 'header')}]}
												</td>
											</tr>
											<tr ng-if="user.weight">
												<td>{[{tr('ui.label:signup:appearance:input-weight')}]}:</td>
												<td>
													{[{user.weight}]}
													{[{tr('ui.label:signup:appearance:input-weight', 'header')}]}
												</td>
											</tr>
											<tr ng-repeat="field in user.fields" ng-if="profileTabFields.indexOf(field.type) > -1">
												<td>{[{tr(field.name)}]}:</td>
												<td>{[{tr(field.name + ':' + field.label)}]}</td>
											</tr>
										</table>
										<!-- <a href="#"><i class="point grey"></i><i class="point grey"></i><i class="point grey"></i></a> -->
									</div>
									<label ng-cloak ng-if="profile.tags.length">{[{ tr('ui.user:settings:label:preferences') }]}</label>
									<ul class="list-unstyled tag-profile" ng-cloak>
										<li ng-repeat="tag in profile.tags">
											{[{tag.text}]}
										</li>
									</ul>
									<label ng-cloak ng-if="profile.bodyTags.length">{[{ tr('ui.user:settings:label:body-decorations') }]}</label>
									<ul class="list-unstyled tag-profile" ng-cloak>
										<li ng-repeat="tag in profile.bodyTags">
											{[{tag.text}]}
										</li>
									</ul>
									<div class="editable">
										<a ng-cloak href="/settings" data-name="tags" class="edit-link hover-text">
											<i class="icon icon-edit"></i>
											{[{ tr('ui.user:profile:label:edit-tags') }]}
										</a>
									</div>
									</uib-tab>
									<uib-tab ng-init="tabs[1].active = isActiveTab(1)" active="tabs[1].active"  select="setActiveTab(1)">
									<uib-tab-heading>
									<i class="icon icon-photo"></i>
									{[{ tr('ui.user:label:photo') }]}
									</uib-tab-heading>
									<div   ng-cloak id="albums" ng-controller="albumCtrl">
										<ul class="album-list list-unstyled" ng-init="loadAlbums()">
											<li ng-repeat="(key, album) in userAlbums track by $index" >
												<div class="album-wrap" ng-click="showAlbum(key)">
													<div class="album-edit" ng-click="changeAlbum(key,album.id);$event.stopPropagation()">
														<img src="assets/ui/img/icons/pen.png" alt="">
													</div>
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
										<div class="add-album" id="add-album" ng-click="addAlbum()">
											+ {[{tr('ui.user:profile:label:album:title:add')}]}
										</div>
										<div class="show-all-album" ng-if="userAlbums != 0" ng-click="showAll()">
											{[{tr('ui.user:profile:label:album:title:show')}]}
										</div>
									</div>
									</uib-tab>
									
									<uib-tab ng-init="tabs[2].active = isActiveTab(2)" active="tabs[2].active"  select="setActiveTab(2)">
									<uib-tab-heading>
									{[{ tr('ui.user:label:gifts') }]}
									</uib-tab-heading>
									</uib-tab>
									</uib-tabset>
									<!-- Tests -->
									<div ng-cloak class="extra-info">
										<h4>
										{[{ tr('ui.user:profile:passed_tests') }]}
										<a href="#" class="pull-right">
											<span class="color-success">+3 новых</span>
										</a>
										<a href="#" class="pull-right">Все</a>
										</h4>
										<ul class="list-inline">
											<li><a href="#"><i class="icon-big icon-heart"></i></a></li>
											<li><a href="#"><i class="icon-big icon-lightning"></i></a></li>
											<li><a href="#"><i class="icon-big icon-music"></i></a></li>
											<li><a href="#"><i class="icon-big icon-chat"></i></a></li>
										</ul>
									</div>
									<div class="editable">
									<addAlbum-Widget></addAlbum-Widget>
									<div ng-cloak class="extra-info">
										<h4>
										{[{ tr('ui.user:profile:label:iwant') }]}
										<a href="#" data-name="iwant" class="edit-link edit-button hover-text">
											<i class="icon icon-edit"></i>
											{[{ tr('ui.user:profile:label:edit-text') }]}
										</a>
										</h4>
										<div ng-cloak id="iwant-value">{[{user.iwant}]}</div>
										<!-- Edit -->
										<div style="display:none" class="iwant-edit edit-form">
											<form action="#">
												<textarea class="edit-input" ng-init="iwant=user.iwant" ng-model="iwant" name="iwant" cols="40" rows="5"></textarea>
												<br>
												<a ng-click="update('iwant', iwant)" class="btn btn-primary update-field" data-name="iwant" href="#">
													{[{ tr('ui.user:profile:label:update') }]}
												</a>
											</form>
										</div>
									</div>
								</div>
								</div><!-- ./personal-summary -->
								</div><!-- /.personal-right-->
								@include('partials.alike')
							</div>
						</div>
						</div><!-- /.content -->
						<!--  confirm delete modal -->
					</div>
					</div><!-- /.content -->
				<addtopmessage-Widget></addtopmessage-Widget>
				@stop