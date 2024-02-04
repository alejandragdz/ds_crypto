class HomeController < ApplicationController
  require 'csv'

  def index
    begin
      @table = CSV.parse(File.read("app/assets/docs/origen.csv"), headers: true)
      @table.each do |row|
        investment = Investment.create!(coin: row["Moneda"], interest: row["Interes_mensual"].to_f, balance_init: row["balance_ini"].to_f)
      end
    rescue => e
      redirect_to error_page_url, notice: e
    end
  end
end