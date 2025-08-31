<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">

  <h2>Labs 1-5</h2>
  
  <p>Student ID: 24064091</p>
  <p>Student Name: Zichen</p>

</div>

# Lab 1

## AWS Account and Log in

### [1] Log into an IAM user account created for you on AWS.

#### [1.1.1] Log into an IAM user account created for me on AWS

**Description:** Following the lab's reference prompts, I clicked on the AWS console's URL https://489389878001.signin.aws.amazon.com/console and entered my user ID, username, and password.

**Result:** Successfully logged into AWS console as IAM user with username 24064091@student.uwa.edu.au

### [2] Search and open Identity Access Management

**Step1-Description:** Once logged in, I clicked on the user-inverted triangle icon at the top right of the current page and found the security credentials there. Security Credentials for AWS are credentials used for authentication and authorisation that allow users and programs to access AWS services and resources securely. The primary role of security credentials is to ensure that only authorized users and applications can access resources on AWS, such as EC2 instances, S3 storage buckets, and so on.

**Step2-Description:** After clicking on the security credentials, the access key page is found, asking to create access key.

**Step3-Description:** After clicking create an access key, perform the steps "access key best practices&alternatives", "set description tag" and "retrieve access key" to complete the access key creation. And we can also see the Secret access key by clicking the blue "show".

## Set up recent Unix-like OSes

**Description:** As needed, I chose Virtual Box as a virtual machine to run the Kali Linux operating system.

## Install Linux packages

### [1] Install Python

**Description:** According to the lab reference, I entered the commands `python3 --version` and `pip3 --version` to see the latest versions of python3 and pip3, which are Python 3.11.9 and pip 24.1.1 respectively; then followed the further prompts to install pip by typing the command:

```bash
sudo apt install python3 python3-pip
```

**Explanation:** pip: python's package management tool for installing and managing Python libraries and tools.


### [2] Install awscli

**Description:** Then, following further prompts, I entered the command:

```bash
sudo apt install awscli
```

to install the AWS CLI (Amazon Web Services Command Line Interface). Then I entered the command:

```bash
pip3 install awscli --upgrade
```

to install or upgrade the AWS CLI (Amazon Web Services Command Line Interface) tool using Python's package manager pip.

**Explanation:** **AWS CLI (Amazon Web Services Command Line Interface):** is a command line tool that allows users to interact with various cloud services provided by Amazon Web Services (AWS) through a command line interface. It simplifies the management and automation of AWS services for developers, system administrators, and cloud engineers.

- **awscli:** specify to install the AWS CLI tool
- **--upgrade:** Indicates that pip will attempt to upgrade to the latest version if the AWS CLI is already installed. If it is not installed, it will do a fresh install


### [3] Configure AWS

**Description:** Upon further prompting, I entered the command:

```bash
aws configure
```

to set and save the credentials and default settings required by the AWS CLI so that the CLI can properly interact with AWS services. Once the entry is complete, the AWS Access Key ID, AWS Secret Access Key, Default region name, and Default output format appear.

**Explanation:**

- **AWS Access Key ID:** this is one of the authentication keys for AWS users. It is used in conjunction with the AWS Secret Access Key so that the CLI can authenticate your identity and authorise access to AWS resources.

- **AWS Secret Access Key:** this is the confidential part of the access key and is paired with the Access Key ID. This key is used to ensure that the source of the request is an authenticated user.

- **Default region name:** the default AWS region want to operate in. A region is the physical location of an AWS data centre, in this case the region "ca-central-1" based on a range of school numbers.

- Default output format:

   specifies the format of AWS CLI command output. Common options are:

  - json: JSON format output (default)
  - text: Plain text format output
  - table: Tabular output


### [4] Install boto3

**Description:** Next I entered the command:

```bash
pip3 install boto3
```

to install boto3 so that I can access and manage AWS services by writing python code.

**Explanation:** **boto3:** is the official Python SDK (Software Development Kit) for interacting with Amazon Web Services (AWS). It allows developers to access and manage AWS services such as S3, EC2, DynamoDB, Lambda, RDS, etc. via Python code. boto3 provides an abstraction of the AWS service APIs, which simplifies programming and supports the automation of many common tasks (e.g., authentication, error retries, etc.).


## Test the installed environment

### [1] Test the AWS environment

**Description:** Following the lab reference prompts, I entered the command:

```bash
aws ec2 describe-regions --output table
```

to list the available regions in AWS and output the results in a tabular format. As can be seen from the results, all the expected available regions appear, indicating that the AWS environment is normal.

**Explanation:**

- **aws:** AWS Command Line Interface (CLI) master command
- **ec2:** subcommand for the AWS EC2 (Elastic Compute Cloud) service. ec2 is AWS' virtual server service
- **describe-regions:** this is an operational command of the AWS EC2 service that describes or lists all available AWS regions
- **--output table:** this is an option to specify the output format. The --output defines the output format of the AWS CLI commands. table format is the formatting of the output into a table style to make the information clearer and neater


### [2] Test the Python environment

**Description:** Next, I enter the command `python3` to enter the python code editing mode and enter the following code to finally output the available regions in dictionary form.

```python
import boto3
ec2 = boto3.client('ec2')
response = ec2.describe_regions()
print(response)
```

**Explanation:**

- **import boto3:** import the Boto3 library, the official Python SDK for AWS that allows programmatic interaction with AWS services. boto3 is the main library for accessing AWS services, through which service clients and resource objects can be created
- **ec2=boto3.client('ec2'):** create an EC2 client object via boto3.client('ec2'). boto3.client method is used to create a client that interacts with a specific AWS service, in this instance ec2. The client object ec2 will be used to invoke various API operations of the AWS EC2 service, such as describing regions, starting instances, stopping instances, etc. client('ec2') indicates that you want to interact with the EC2 service
- **response=ec2.describe_regions():** Use the EC2 client object ec2 to call the describe_regions method. describe_regions is one of the EC2 service's API operations for obtaining information about all of AWS's available regions (regions). The method returns a response dictionary containing information about all the regions, including the name and endpoint of each region
- **print(response):** output the dictionary


### [3] Write a Python script

**Description:** Finally, I proceeded to write the following Python code to fulfill the requirement '2 columns with Endpoint and RegionName':

```python
import boto3
import pandas as pd
ec2 = boto3.client('ec2')
response = ec2.describe_regions()
regions_data = response['Regions']
data = [(region['Endpoint'], region['RegionName']) for region in regions_data]
df = pd.DataFrame(data, columns=['Endpoint', 'RegionName'])
print(df)
```

**Explanation:**

- **pandas:** data manipulation and analysis library
- **regions = response['Regions']**
- **data = [(region['Endpoint'], region['RegionName']) for region in regions]:** extracts the Endpoint and RegionName from each region and formats it into a list of tuples
- **df = pd.DataFrame(data, columns=['Endpoint', 'RegionName']):** converts the list of tuples into a Pandas DataFrame with columns Endpoint and RegionName


<div style="page-break-after: always;"></div>

# Lab 2

<div style="page-break-after: always;"></div>

# Lab 3

<div style="page-break-after: always;"></div>

# Lab 4

<div style="page-break-after: always;"></div>

# Lab 5

