class UsecasesController < ApplicationController
  before_action :set_usecase, only: [:show, :edit, :update, :destroy]

  # GET /usecases
  # GET /usecases.json
  def index
    @usecases = Usecase.all
  end

  # GET /usecases/1
  # GET /usecases/1.json
  def show
  end

  # GET /usecases/new
  def new
    @usecase = Usecase.new
  end

  # GET /usecases/1/edit
  def edit
  end

  # POST /usecases
  # POST /usecases.json
  def create
    @usecase = Usecase.new(usecase_params)

    respond_to do |format|
      if @usecase.save
        format.html { redirect_to @usecase, notice: 'Usecase was successfully created.' }
        format.json { render :show, status: :created, location: @usecase }
      else
        format.html { render :new }
        format.json { render json: @usecase.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /usecases/1
  # PATCH/PUT /usecases/1.json
  def update
    respond_to do |format|
      if @usecase.update(usecase_params)
        format.html { redirect_to @usecase, notice: 'Usecase was successfully updated.' }
        format.json { render :show, status: :ok, location: @usecase }
      else
        format.html { render :edit }
        format.json { render json: @usecase.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /usecases/1
  # DELETE /usecases/1.json
  def destroy
    @usecase.destroy
    respond_to do |format|
      format.html { redirect_to usecases_url, notice: 'Usecase was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_usecase
      @usecase = Usecase.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def usecase_params
      params.require(:usecase).permit(:name,:short,:discription)
    end
end
