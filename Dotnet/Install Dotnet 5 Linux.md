Step 1: 
	Get dotnet 5 SDK from official site

wget https://download.visualstudio.microsoft.com/download/pr/820db713-c9a5-466e-b72a-16f2f5ed00e2/628aa2a75f6aa270e77f4a83b3742fb8/dotnet-sdk-5.0.100-linux-x64.tar.gz

	To install ARM version dotnet 5.0, use this

wget https://download.visualstudio.microsoft.com/download/pr/27840e8b-d61c-472d-8e11-c16784d40091/ae9780ccda4499405cf6f0924f6f036a/dotnet-sdk-5.0.100-linux-arm64.tar.gz


Step 2: 

mkdir dotnet-64
tar zxf dotnet-sdk-5.0.100-linux-x64.tar.gz -C $HOME/dotnet-64


Step 3:

export DOTNET_ROOT=$HOME/dotnet-64
export PATH=$HOME/dotnet-64:$PATH


Step 4:

dotnet --info o