require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index if csv file is correct" do
    get root_url
    assert_response :success
  end
  
  # test "should not get index if csv file is incorrect" do
  #   get root_url
  #   assert_redirected_to error_page_url
  # end
end
