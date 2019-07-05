class DepositsController < ApplicationController

  # GET /deposits
  def index
    @deposits = Deposit.all
    render json: @deposits
  end
end
