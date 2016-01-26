@section('content')
<div class="wrap" ng-controller="ImCtrl">
    @include('layouts.sidebar')
    <div class="main wrap">
        <!-- Top users -->
        <topusers-Widget></topusers-Widget>
        <div id="im-app" >
            
            <div class="pm-message-wrap">
                <div class="pm-header">
                    <a ng-cloak class="btn btn-dialog" href="{{url('inbox')}}">
                        {[{ tr('ui.label:im:my-dialogs') }]}
                    </a>
                    <!-- Users -->
                    <ul ng-cloak class="nav nav-tabs chat-user">
                        <li ng-repeat="ulist in msgs" data-id="{[{ulist.to}]}" ng-click="changeTo($event, ulist.to)" ng-class="(to==ulist.to)?'active':''">
                            <a href="#user{[{ulist.to}]}">
                                <img ng-cloak ng-src="{[{ulist.users[ulist.to].img}]}" class="img-circle">
                                    {[{ulist.users[ulist.to].nickname}]}
                                <span
                                    ng-class="ulist.users[ulist.to].online? 'is-online' : 'is-offline'"
                                    class="status">
                                </span>
                            </a>
                            <a ng-click="removePeer($event, ulist.to)" class="remove-from-list" href="#">&times;</a>
                        </li>
                    </ul>
                </div>
                <div class="pm-messages-container">
                    <!-- User messages -->
                    <usermessages-Widget></usermessages-Widget>

                    <p style="display:none" class="typing">Typing...</p>
                </div>
                <div class="pm-send-and-part">
                    <div class="pm-send-box">
                        <div data-id="{[{user.id}]}" data-nickname="{[{user.nickname}]}" class="pm-your-avatar">
                            <img ng-src="{[{user.photoMediumThird}]}" class="img-circle img-responsive">
                            <div class="ownerData"
                                data-id="{[{user.id}]}"
                                data-img="{[{user.photoMediumThird}]}"
                                data-nickname="{[{user.nickname}]}"
                            ></div>
                        </div>
                        <div class="pm-form-holder">
                            
                            <a class="pm-vchat" href="#">Video Chat</a>
                            <!--<textarea ng-bind-html="messageText" id="pf-text" ng-keypress="showTyping()" ng-model="messageText" ng-keyup="$event.keyCode == 13 ? sendMessage() : null"></textarea>
                            -->
                            <div ng-bind-html="messageText" ng-keypress="showTyping()" ng-model="messageText" ng-keyup="$event.keyCode == 13 ? sendMessage() : null" id="divliketext" contenteditable></div>
                            <div class="pm-attachments">
                                {{-- <ul>
                                    <li><a class="add-video" href="#">Add Video</a></li>
                                    <li><a class="add-img" href="#">Add Image</a></li>
                                    <li><a class="add-audio" href="#">Add Audio</a></li>
                                </ul> --}}
                                <div id="smiles">
                                    <span id="emoticonList" ng-repeat="(key, image) in emoticons">
                                        <img ng-src="{[{emoticon_url}]}{[{image}]}" ng-click="insertEmoticon(key)" />
                                    </span>
                                </div>
                                <a class="open-smiles" ng-click="toggleSmiles($event)" href="">Смайлы</a>
                            </div>
                            
                        </div>
                        
                        <div class="pm-button-wrap">
                            <button
                            type="button"
                            ng-click="sendMessage()"
                            class="btn btn-primary btn-pm-send">
                            {{ \Lang::get('ui.label:im:send') }}
                            </button>
                        </div>
                    </div>
                    <div class="pm-add-partners">
                        <ul>
                            <li><a href="#"><img class="img-circle img-responsive" src="images/lol.jpg"></a></li>
                            <li>
                                <button type="button" class="btn-plus" data-toggle="modal" data-target="#addModal">
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="clearfix"></div>
            </div>

            <friendslist-Widget></friendslist-Widget>
            
            <!-- Modal -->
            <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel">
                <div class="modal-dialog-message" role="document">
                    
                    <div class="modal-add-friend">
                        <div class="modal-title-message"><strong> + Добавить собеседников</strong></div>
                        <div class="add-friend-content">
                            <div class="add-friend-search">
                                <label><input placeholder="Поиск собеседников..." ng-model="searchText"></label>
                                <table>
                                    <tr ng-repeat="fr in user.friends | filter:searchText">
                                        
                                        <td>
                                            <a href="#{[{fr.id}]}">
                                                <img ng-cloak ng-src="{[{fr.photosSmall}]}" class="img-circle img50x50" >
                                                {[{fr.nickname}]}
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!-- <div class="add-friend-member">
                                <label ><strong>Участники диалога:</strong></label>
                                <table>
                                    <tr ng-repeat="(uid, ulist) in msgs">
                                        <td>
                                            <a href="#user{[{ulist.to}]}">
                                                <img ng-cloak ng-src="{[{ulist.users[ulist.to].img}]}" class="img-circle">
                                                {[{ulist.users[ulist.to].nickname}]}
                                            </a>
                                        </td>
                                        
                                    </tr>
                                </table>
                                <hr>
                                <button id="create-dialog" class="btn btn-primary btn-sm ">
                                Создать беседу
                                </button>
                            </div> -->
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            </div><!-- /.content -->
        <addtopmessage-Widget></addtopmessage-Widget>
        </div><!-- /.main-->
    </div>
    @stop