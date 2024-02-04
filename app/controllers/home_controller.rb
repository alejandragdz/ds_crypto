class HomeController < ApplicationController
  require 'csv'

  def index
    begin
      @investments = []
      @table = CSV.parse(File.read("app/assets/docs/origen.csv"), headers: true)
      @table.each do |row|
        investment     = Investment.new(coin: row["Moneda"], interest: row["Interes_mensual"].to_f, balance_init: row["balance_ini"].to_f)
        investment.pay = ((investment.interest / 100)*investment.balance_init)*12
        @investments.push(investment)
      end
    rescue => e
      redirect_to error_page_url, notice: e
    end
  end
end
