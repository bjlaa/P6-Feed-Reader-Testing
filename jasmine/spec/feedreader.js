/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('all have a url defined and not empty', function(){
            for(i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('all have a name defined and not empty', function(){
            for(i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });

    });

    describe('The menu', function(){

        it('has a menu hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        it('displays and remove the menu when the menu icon is clicked', function(){
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });
 
    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('has at least one .entry when loadFeed is completed', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function(){

        var $feed;
        var $newFeed; 

        beforeEach(function(done){
            loadFeed(0, function(){
                $feed = $('.header-title').html();   
            });
            loadFeed(1, done);
        });

        it('changes of feed content when a new feed is loaded by loadFeed', function(){
            $newFeed = $('.header-title').html();
            expect($feed).not.toEqual($newFeed);
        });

    });

    //modifies the time Jasmine waits for our async function to be
    //complete before running test
    jasmine.getEnv().defaultTimeoutInterval = 15000;
}());
