class HomeController < ApplicationController
  require 'csv'
  require 'json_builder'

  def index
    Investment.delete_all
    begin
      @table = CSV.parse(File.read("app/assets/docs/origen.csv"), headers: true)
      @table.each do |row|
        investment         = Investment.new(asset: row["asset_id"], coin: row["Moneda"], interest: row["Interes_mensual"].to_f, balance_init: row["balance_ini"].to_f)
        investment.pay     = ((investment.interest / 100)*investment.balance_init)*12
        investment.balance = investment.balance_init + investment.pay
        investment.save
      end
    rescue => e
      redirect_to error_page_url, notice: e
    end
  end

  def download_json
    respond_to do |format|
      format.json { render json: Jbuilder.new { |json| json.array! Investment.all, :coin, :balance_init, :interest, :pay, :balance  }.target! }
    end
  end

  def download_csv
    attributes = %w{coin balance_init interest pay balance}
    @new_csv = CSV.generate(headers: true) do |csv|
      csv << attributes
      Investment.all.each do |inv|
        csv << attributes.map{ |attr| inv.send(attr) }
      end
    end
    send_data @new_csv, :type => "text/plain", :disposition => "attachment; filename=investments.csv"
  end
end
