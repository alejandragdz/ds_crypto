require "test_helper"

class InvestmentTest < ActiveSupport::TestCase
  test "should not save investment without data" do
    investment = Investment.new
    assert_not investment.save
  end
  
  test "should not save investment without coin" do
    investment = Investment.new(interest: 5, balance_init: 500)
    assert_not investment.save
  end
  
  test "should not save investment without interest" do
    investment = Investment.new(coin: "Bitcoin", balance_init: 500)
    assert_not investment.save
  end
  
  test "should not save investment without numericality interest" do
    investment = Investment.new(coin: "Bitcoin", interest: "cinco", balance_init: 500)
    assert_not investment.save
  end
  
  test "should not save investment without interest greater than 0" do
    investment = Investment.new(coin: "Bitcoin", interest: 0, balance_init: 500)
    assert_not investment.save
  end
  
  test "should not save investment without balance_init" do
    investment = Investment.new(coin: "Bitcoin", balance_init: 500)
    assert_not investment.save
  end
  
  test "should not save investment without numericality balance_init" do
    investment = Investment.new(coin: "Bitcoin", interest: 5, balance_init: "Quinientos")
    assert_not investment.save
  end
  
  test "should not save investment without balance_init greater than 0" do
    investment = Investment.new(coin: "Bitcoin", interest: 5, balance_init: 0)
    assert_not investment.save
  end
  
  test "should save investment with all data, interest and balance_init numericality and greater than 0" do
    investment = Investment.new(coin: "Bitcoin", interest: 5, balance_init: 500)
    assert investment.save
  end
end
