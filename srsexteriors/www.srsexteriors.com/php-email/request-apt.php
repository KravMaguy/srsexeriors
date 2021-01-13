<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>title</title>
    <link href="../css/bundle.ui.default/main.css" rel="stylesheet"/>

    <script src="../js/bundle.ui.default/unminified_js.js"></script>
  </head>
  <body>
    <?php
   
    if(isset($_POST['name'])&&isset($_POST['email'])&&isset($_POST['phone'])&&isset($_POST['address'])){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo var_dump($_REQUEST);
            exit;
        } else{
            echo 'reached line';

        }
    } else {
        echo 'php here';
    }

    ?>
    <form id="price-quote" action="" method="post" role="form">
        <div class="h4 form-title">Get Your Free Estimate!</div>
        <div class="form-group">
            <label for="name" class="sr-only">Full Name</label>
            <input id="name" name="name" class="form-control" type="text" placeholder="Full Name" maxlength="50" required>
        </div>
        <div class="form-group">
            <label for="email" class="sr-only">Email Address</label>
            <input id="email" name="email" class="form-control" type="email" placeholder="Email Address" maxlength="50" required>
        </div>
        <div class="form-group">
            <label for="phone" class="sr-only">Phone Number</label>
            <input id="phone" name="phone" class="form-control" type="tel" placeholder="Phone Number" maxlength="14" required>
        </div>
        <div class="form-group">
            <label for="address" class="sr-only">Full Address</label>
            <input id="address" name="address" class="form-control" type="text" placeholder="Full Address" autocomplete="none" required>
        </div>
            <div class="row form-switch form-group">
                <div class="col-xs-7 label-text">
                    <p>Request appointment?</p>
                </div>
                <div class="col-xs-5">
                    <div class="onoffswitch">
                        <button class="onoffswitch-toggle collapsed" type="button" data-toggle="collapse" data-target="#collapse-app-set">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                            <span class="sr-only">Request appointment?</span>
                        </button>
                    </div>
                </div>
            </div>
            <div id="collapse-app-set" class="collapse" aria-expanded="false">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="apptdateraw" class="sr-only">What day works best for you?</label>
                            <input id="apptdateraw" name="apptdateraw" class="input datepicker form-control select-date" data-date-format="mm/dd/yy" type="text" placeholder="Date" data-action-field="apptdateraw" data-time-field="appttime">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="appttime" class="sr-only">What time works best for you?</label>
                            <select id="appttime" name="appttime" class="form-control">
                                <option value="" selected="selected">Time</option>
                                <option value="Early Morning">Early Morning</option>
                                <option value="Morning">Morning </option>
                                <option value="Noon">Noon</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Early Evening">Early Evening</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
    
                <div class="form-group">
                    <label for="service" class="sr-only">Project Type</label>
                    <select id="service" name="service" class="form-control">
                        <option value="">Project Type</option>
                            <option value="Roofing" >Roofing</option>
                            <option value="Commercial Roofing" >Commercial Roofing</option>
                            <option value="Siding" >Siding</option>
                            <option value="Windows" >Windows</option>
                            <option value="Gutters" >Gutters</option>
                            <option value="Storm Restoration" >Storm Restoration</option>
                    </select>
                </div>
    
        <div class="form-group">
            <label for="details" class="sr-only">Project Description</label>
            <textarea id="details" name="details" class="form-control" placeholder="Project Description" rows="3" maxlength="3000"></textarea>
        </div>
        
        
    
    
        
        <input type="hidden" name="setappointment" value="false" autocomplete="off">
        <input id="price-quote-type" name="type" type="hidden" value="Quote">
        <input id="quoteToken" name="quoteToken" type="hidden" value="" />
        <!--Change data-value to enable variant page. -->
        <!--Phone trackable and phone ID (Ex: 219-555-5555 and 0001) must be a real number in the admin-->
        <input id="variantPage" name="variantPage" type="hidden" data-value="false" data-phone-trackable="" data-phone-id="" value="" />
        <input type="hidden" name="form" value="remodeler"/>
        <button id="price-quote-submit" class="btn btn-lg btn-block btn-primary submit-form" type="submit">
            Get Free Estimate
        </button>
        
    </form>
  </body>
</html>



